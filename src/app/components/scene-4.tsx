import React, { useState } from "react";
import { Timeline } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";
import { ResponsiveButton } from "../../components/responsive/responsive-button";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveTextArea } from "../../components/responsive/responsive-textarea";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { ResponsiveComponent } from "../../modules/responsive/responsive";

import { SceneData } from "../data/scene-4.ts-data";
import { ResponsiveInput } from "../../components/responsive/responsive-input";
import { PushMessage } from "../../gcp/modules/firestore.message";
import { BannerFlow } from "../../components/banner";

import "../styles/sass/scene.sass";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";

export const SceneScript = () => {
  const [messageFrom, setOrigin] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const VerifiedSceneText = UseNonUndefined(SceneData.SceneTexts);

  const handleNewMessage = () => {
    const messagePackage = {
      from: messageFrom,
      content: message,
    };
    BannerFlow.next({
      color: "blue",
      content: VerifiedSceneText.bannerSendingText,
      title: "Message",
      duration: 5000,
    });

    setOrigin("");
    setMessage("");

    PushMessage(messagePackage)
      .catch(() => {
        BannerFlow.next({
          color: "red",
          content: VerifiedSceneText.bannerErrorText,
          title: "Error",
          duration: 5000,
        });
        setMessage(messagePackage.content);
        setOrigin(messagePackage.from);
      })
      .then(() =>
        BannerFlow.next({
          color: "#0b3d00",
          content: VerifiedSceneText.bannerSuccessText,
          title: "Success",
          duration: 5000,
        })
      );
  };

  return (
    <div {...SceneData.SceneData}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        }}
      >
        <div
          style={{
            width: "80%",
          }}
        >
          <div>
            <ResponsiveSubtitle>
              {VerifiedSceneText.subtitle1}
            </ResponsiveSubtitle>
            <ResponsiveDescription>
              {VerifiedSceneText.description1}
            </ResponsiveDescription>
          </div>
          <div
            style={{
              marginTop: "3%",
            }}
          >
            <ResponsiveDescription>
              {VerifiedSceneText.description2}
            </ResponsiveDescription>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1%",
            }}
          >
            <ResponsiveInput
              value={messageFrom}
              dispatcher={setOrigin}
              placeholder={VerifiedSceneText.placeholder1}
            />
          </div>
          <div
            style={{
              marginTop: "0.5%",
            }}
          >
            <ResponsiveDescription>
              {VerifiedSceneText.description3}
            </ResponsiveDescription>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1%",
            }}
          >
            <ResponsiveTextArea
              value={message}
              dispatcher={setMessage}
              placeholder={VerifiedSceneText.placeholder2}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "5%",
            }}
          >
            <ResponsiveComponent
              style={{
                width: "20%",
              }}
              mobile_style={{ width: "40%" }}
            >
              <ResponsiveButton
                handleClick={handleNewMessage}
                activate={
                  message.length > 0 &&
                  messageFrom.length > 0 &&
                  messageFrom.indexOf("@") > 0
                }
              >
                {VerifiedSceneText.buttonText1}
              </ResponsiveButton>
            </ResponsiveComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
