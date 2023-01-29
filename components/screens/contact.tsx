import { send } from "@emailjs/browser";
import { Motion } from "@motionone/solid";
import { createSignal, Show } from "solid-js";
import { StepScrollContext } from "../../contexts/step-scroll";
import { useScreenType } from "../../hooks/screen";

import "../../sass/custom/input.scss";

export function ContactScreen() {
  const screenType = useScreenType();

  const [from, setFrom] = createSignal("");
  const [subject, setSubject] = createSignal("");
  const [message, setMessage] = createSignal("");

  const [sendingMessage, updateMessageSendingState] = createSignal(false);
  const [messageSentState, updateMessageSentState] = createSignal<
    "sent" | "fail" | "none"
  >("none");

  return (
    <Motion.div
      style={{
        "min-height": "100vh",
        display: "flex",
        "flex-direction": "column",
        width: "100%",
        position: "absolute",
        background: "var(--background)",
        "will-change": "transform",
      }}
      animate={{
        y:
          (-StepScrollContext.originalElementDistance() + 2) *
          window.innerHeight,
      }}
      transition={{
        y: {
          duration: 0.5,
          allowWebkitAcceleration: true,
          easing: "ease-in-out",
        },
      }}
    >
      <div
        style={{
          width: "94%",
          height: "100%",
          padding: "3%",
        }}
      >
        <h1>CONTACT ME</h1>
        <Show when={screenType() === "big"}>
          <br />
          <br />
          <br />
        </Show>
        <form
          style={{
            width: "100%",
            height: "100%",
          }}
          class="prevent-styling"
          onSubmit={async (ev) => {
            ev.preventDefault();
            updateMessageSendingState(true);
            const state = await send("portfolio_emser", "portfolio_message", {
              sender: from(),
              subject: subject(),
              message: message(),
            });

            updateMessageSendingState(false);
            updateMessageSentState(state.status === 200 ? "sent" : "fail");

            if (state.status === 200) {
              setFrom("");
              setSubject("");
              setMessage("");
            }
          }}
        >
          <Show when={screenType() === "big"}>
            <br />
            <br />
          </Show>
          <div
            style={{
              width: "100%",
              display: "flex",
              "justify-content": "center",
            }}
          >
            <div
              class="dynamic-2col-grid"
              style={{ "max-width": "1400px", width: "95%" }}
            >
              <div>
                <Show
                  when={screenType() === "big"}
                  fallback={<h2>Your message</h2>}
                >
                  <h2>Who are you ?</h2>
                </Show>
                <br />
                <input
                  type="email"
                  name="email"
                  autocomplete="email"
                  value={from()}
                  onChange={(ev) => {
                    setFrom((ev.target as any).value);
                    updateMessageSendingState(false);
                    updateMessageSentState("none");
                  }}
                  placeholder="How can I contact you back ?"
                  disabled={sendingMessage()}
                />
                <p class="tiny" style={{ "max-width": "500px" }}>
                  I'm going to use this email address to contact you back, make
                  sure it's correctly formatted and you wrote YOUR email address
                  !
                </p>
                <Show when={screenType() === "big"}>
                  <br />
                  <br />
                </Show>
                <br />
                <input
                  type="text"
                  autocomplete="off"
                  value={subject()}
                  onChange={(ev) => {
                    setSubject((ev.target as any).value);
                    updateMessageSendingState(false);
                    updateMessageSentState("none");
                  }}
                  placeholder="What do you want to talk about ?"
                  disabled={sendingMessage()}
                />
                <Show when={screenType() === "big"}>
                  <p class="tiny" style={{ "max-width": "500px" }}>
                    It's the first thing I'm going to see, so make sure to be
                    absolutely clear about your demandings.
                  </p>
                  <br />
                  <br />
                </Show>
                <br />
              </div>
              <div>
                <Show when={screenType() === "big"}>
                  <h2>Your message</h2>
                  <p class="tiny" style={{ "max-width": "500px" }}>
                    This is the body of your message, you can write anything
                    here !
                  </p>
                  <br />
                  <br />
                </Show>
                <textarea
                  value={message()}
                  onChange={(ev) => setMessage((ev.target as any).value)}
                  placeholder="What do you have to tell me ?"
                  style={{height: screenType() === "tiny" ? "30vh" :" 30vh"}}
                  disabled={sendingMessage()}
                />
              </div>
              <div style={{ display: "flex", "justify-content": screenType() === "tiny" ? "center": "left" }}>
              <Motion.input
                type="submit"
                value={
                  sendingMessage()
                    ? "Sending..."
                    : messageSentState() === "sent"
                    ? "Sent 👌"
                    : "Send"
                }
                disabled={
                  message().length < 4 ||
                  subject().length < 4 ||
                  sendingMessage()
                    ? true
                    : false
                }
                initial={{
                  scale: 1
                }}
                animate={{
                  scale: sendingMessage() ? [1, .8, 1] : [1],
                  width: screenType() === "tiny" && !sendingMessage() ? "100%" : "50%"
                }}
                transition={{
                  scale: {
                    repeat: Infinity,
                    duration: 1
                  }
                }}
                class={messageSentState() === "fail" ? "btn-red" : ""}
              />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Motion.div>
  );
}
