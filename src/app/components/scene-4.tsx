import { useState } from "react";
import { ResponsiveButton } from "../../components/responsive/responsive-button";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveTextArea } from "../../components/responsive/responsive-textarea";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { ResponsiveComponent } from "../../modules/responsive/responsive";

import { PageData } from "../data/scene-4.ts-data";
import { ResponsiveInput } from "../../components/responsive/responsive-input";
import { PushMessage } from "../../gcp/modules/firestore.message";
import { BannerFlow } from "../../components/banner";

import "../styles/sass/scene.sass";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";

export const PageScript = () => {
  const [messageFrom, setOrigin] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const VerifiedPageText = UseNonUndefined(PageData.PageTexts);

  const handleNewMessage = () => {
    const messagePackage = {
      from: messageFrom,
      content: message,
    };
    BannerFlow.next({
      color: "blue",
      content: VerifiedPageText.bannerSendingText,
      title: "Message",
      duration: 5000,
    });

    setOrigin("");
    setMessage("");

    PushMessage(messagePackage)
      .catch(() => {
        BannerFlow.next({
          color: "red",
          content: VerifiedPageText.bannerErrorText,
          title: "Error",
          duration: 5000,
        });
        setMessage(messagePackage.content);
        setOrigin(messagePackage.from);
      })
      .then(() =>
        BannerFlow.next({
          color: "#0b3d00",
          content: VerifiedPageText.bannerSuccessText,
          title: "Success",
          duration: 5000,
        })
      );
  };

  return (
    <div {...PageData.PageData}>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          marginBottom: "2vh"
        }}
      >
        <div
          style={{
            width: "80%",
          }}
        >
          <div>
            <ResponsiveSubtitle>
              {VerifiedPageText.subtitle1}
            </ResponsiveSubtitle>
            <ResponsiveDescription>
              {VerifiedPageText.description1}
            </ResponsiveDescription>
          </div>
          <div
            style={{
              marginTop: "3%",
            }}
          >
            <ResponsiveDescription>
              {VerifiedPageText.description2}
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
              placeholder={VerifiedPageText.placeholder1}
            />
          </div>
          <div
            style={{
              marginTop: "0.5%",
            }}
          >
            <ResponsiveDescription>
              {VerifiedPageText.description3}
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
              placeholder={VerifiedPageText.placeholder2}
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
                {VerifiedPageText.buttonText1}
              </ResponsiveButton>
            </ResponsiveComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
