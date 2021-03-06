import React, { Component } from "react";
import "./Home.css";
import logo from "./assets/img/Logo.svg"
import icon from "./assets/img/icon.png"
import bird from "./assets/img/bird.png"
import createvote from "./assets/img/createvote.svg"
import unverified from "./assets/img/unverified.svg"
import topButton from "./assets/img/topButton.svg"
import page2 from "./assets/img/page2.svg"
import Votecard from "./Votecard"

import useKernelAuth from './useKernelAuth';

import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useReducer } from 'react';
import { FeedDAC, IdentityDAC, ProfileDAC, SocialDAC } from 'skynet-dacs-library';
import { getSkylinkUrlForPortal, SkynetClient } from 'skynet-js';
import _ from 'lodash'

global.postsLoaded = [];

// Used in AuthButton.js
const useProfile = (userAuthStatus, isKernelLoaded) => {

  const [userProfile, setUserProfile] = useState();
  const [avatar, setAvatar] = useState();

  // // Once logged in and kernelLoaded:
  // // Get userId and use it to fetch user's profile
  // // Using the profile, get a URL for accessing the profile image.

  useEffect(() => {
    const getUserID = async () => {
      try {
        let identityDAC = new IdentityDAC();
        const userID = await identityDAC.userID();
        console.log(userID);

        let profileDAC = new ProfileDAC();
        const result = await profileDAC.getProfile(userID);
        console.log('got result from profile');
        console.log(result);
        setUserProfile(result);
        setAvatar(avatarFieldToUrl(result?.avatar));

        let socialDAC = new SocialDAC();

      } catch (err) {
        console.error({ err });
      }
    };

    console.log("3 params in useProfile: " + userAuthStatus, isKernelLoaded);

    if (userAuthStatus && isKernelLoaded) {
      getUserID();
    }
  }, [userAuthStatus, isKernelLoaded]);

  return userProfile;
};

// helper method for getting user's profile avatarURL given userId
// used in Hacker.js, where it maintains list and state
const getUserAvatar = async (userID) => {

  let profileDAC = new ProfileDAC();
  const result = await profileDAC.getProfile(userID);
  return avatarFieldToUrl(result?.avatar);
};

// Used in Hackers.js
const followUserList = async (userIds, extKey, extValue) => {
  // mock void return
  return;

  const socialDAC = new SocialDAC();

  for (const userId of userIds) {
    console.log('following: ', userId);
    if (extKey && extValue) {
      await socialDAC.follow(userId, { extKey: extValue });
    } else {
      await socialDAC.follow(userId);
    }
  }
};

// Used in IdeaFeed.js
// Notice we handle state and list iteration here, unlike
// the standalone function of getUserAvatar and it use in Hackers.js
const useIdeasFeed = (userAuthStatus, isKernelLoaded) => {
  // Mock data to be replaced by DAC data
  // return {
  //   ideasList: mockIdeas,
  //   loadingProgress: 100,
  //   userProfiles: {},
  // };

  const profileDAC = new ProfileDAC();

  const [loadingProgress, setLoadingProgress] = useState(1);
  const [loadedUsers, setLoadedUsers] = useState(0);

  const getUserProfile = async (userId) => {
    const profile = await profileDAC.getProfile(userId);
    const username = profile?.username
    const avatar = avatarFieldToUrl(profile?.avatar)

    dispatchUserProfiles({userId, avatar, username})
  }

  const [userProfiles, dispatchUserProfiles] = useReducer((state, action) => {

    const key = action.userId;
    const value = {avatar: action.avatar, username:action.username}

    return {...state, [key]: value}
  }, {});

  // dispatched called once per user's posts list
  const [ideasList, dispatchIdeasList] = useReducer((state, action) => {

    // only fetch profile if we are showing posts
    // separate reducer to not block anything
    if (action.posts.length){
      getUserProfile(action.posts[0].userId);
    }

    // take the FeedDAC's post and grab relevant data.
    const postsToIdeas = action.posts.map((post)=>{

      return   {
        id: post.id, // sequential, unique per user, not globally unique
        userId: post.userId,
        title: post.content?.title,
        text: post.content?.text,
        ext: {
          // event: post.content.ext?.event,
          options: ["yes", "yes", "yes"],
          wc: post.content.ext?.wc,
          tc: post.content.ext?.tc, // target count
        },
        ts: post.ts,
      }
    })
    console.log(postsToIdeas)
    const mergePostLists = _.uniqBy([...state, ...postsToIdeas], "ts"); // id isn't uuid, so this should be refined for production
    console.log(`mergedList after ${action.userId}:`, mergePostLists);
    setLoadingProgress(((loadedUsers+1)/(hackerUserIds.length + 1))*100);
    setLoadedUsers(loadedUsers+1);
    console.log(mergePostLists);
    return mergePostLists;
  }, []);

  // Once logged in and kernelLoaded:
  // Use hackerUserIds + logged in userId to generate list of all feed posts
  // ordered by date. Might need to adjust this.

  useEffect(() => {
    const getIdeasList = async () => {
      try {
        let identityDAC = new IdentityDAC();
        const loggedInUser = await identityDAC.userID();
        const userList = [...hackerUserIds, loggedInUser];

        let feedDAC = new FeedDAC();

        for (const userId of userList) {
          console.log('loading posts for user: ', userId);
          const posts = await feedDAC.loadPostsForUser(userId);
          console.log("posts for user: " + userId + " is " + posts);
          global.postsLoaded.push(posts);
          const ideas = posts.filter((post)=> post?.content?.ext?.wc)
          // const ideas = posts;
          dispatchIdeasList({ posts: ideas, userId });
        }
      } catch (err) {
        console.error({ err });
      }
    };

    if (userAuthStatus && isKernelLoaded) {
      getIdeasList();
    }
  }, [userAuthStatus, isKernelLoaded]);

  return {
    ideasList,
    loadingProgress,
    userProfiles,
  };
};

const SKYNET_PORTAL = 'https://siasky.net';

// current Skynet Kernel doesn't handle downloading dataurls or creating preferred portal URLs
// so here we use skynet-js to quickly construct URLs.
const avatarFieldToUrl = (avatar) => {
  if (avatar && avatar[0]?.url){
    return getSkylinkUrlForPortal(SKYNET_PORTAL, avatar[0].url);
  } else {
    return '';
  }
};

const addFriend = () => {
  const socialDAC = new SocialDAC();
  SocialDAC.follow(document.getElementById("friendInput").value);
  // hackerUserIds.push(document.getElementById("friendInput").value);
  console.log(hackerUserIds);
};

// Here we'll bootstrap by hard-coding userIDS (most users might not have a social graph yet.)
// We could create a MySky identity just for creating friendlists which can be loaded in dynamically.
// These could use the `ext` field to designate a list name, event, etc.
// Used for useIdeaFeed and in Hackers.js

const socialDAC = new SocialDAC();
const hackerUserIds = [
  "110b5e276e9f86a84e730307a71882f70e16310a4a088e05608163ac147b0e45"
];


const cardMockDatas = [
  {
    image: bird,
    title: "Vote for the protection of wildlife",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    count: 23541,
    targetCount: 10,
    options: ["yes", "no", "maybe"]
  },
  {
    image: bird,
    title: "Vote for the protection of kingston",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, at volutpat arcu, ut odio montes. Sed integer lobortis massa nisi, posuere.",
    count: 321551,
    targetCount: 20,
    options: ["yes", "maybe", "no"]
  }
]

const Home = (props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  let WCsuccess = searchParams.get("success");
  console.log("has success: " + WCsuccess);

  if (!WCsuccess) {
    window.location.href = "https://developer.worldcoin.org/hosted/wid_f1bbc7a8f2d16ee19396b5ab60e08382?signal=%7ByourSignal%7D"
  }

  const { userAuthStatus, bootloaderLoaded, isKernelLoaded } = useKernelAuth();
  console.log("3 params: " + userAuthStatus, bootloaderLoaded, isKernelLoaded);
  useProfile(userAuthStatus, isKernelLoaded);
  useIdeasFeed(userAuthStatus, isKernelLoaded);

  console.log("getting posts here");
  console.log(global.postsLoaded);

  let allPostsFormatted = []

  for (const postArr of global.postsLoaded) {
    for (const post of postArr) {

      console.log("loaded post: ");
      console.log(post);

      var count = 0;
      if (post.content.text != null) {
        count = post.content.text.charCodeAt(0);
      } else {
        count = post.content.title.charCodeAt(0);
      }

      allPostsFormatted.push({
        image: bird,
        title: post.content.title,
        subtitle: post.content.text,
        count: post.content.title.charCodeAt(0),
        targetCount: post.content.title.charCodeAt(0),
        options: ["Yes", "Maybe", "No"]
      });

    }
  }

    return (
      <div className="snapper">
        <div className="navbarHome">
          <div className="logoBox">
            {/* <img src={logo} alt="Logo"/> */}
            <img src={icon} className="icon"/>
          </div>
          <div className="topright">
            <a href="/create">
              <img src={createvote} alt="createvote"/>
            </a>
          </div>
        </div>

        <div className="content">
          <span className="devoted-to-dem"> Devoted to democracy. </span>
          <span className="subtitle"> Protect the power of your votes from being stolen by fake voters.</span>

          <div className="addFriendBox">
            <input type="text" id="friend" className="addFriendText"></input>
            <img className="topButton" onClick={() => alert("Friend Added!")} src={topButton} />
          </div>

          <img src={page2} className="page2"/>

          <div className="page3">

            <a id="browse"></a>
            <div className="menu">
              <div className="menuItem">
                <span className="menuSelected"> Followed Ongoing Votes </span>
              </div>
            </div>

            {allPostsFormatted.map(data => <Votecard key={data.title} {...data}/>)}

          </div>

        </div>


      </div>
    );

}

export default Home;
