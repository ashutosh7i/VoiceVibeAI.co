// import { Button, Card, CardBody } from "@nextui-org/react";
import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";

import { siteConfig } from "@/config/site";

export const CardAgents = () => {
  return (
    <>
      <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-2 w-full">
        <CardBody className="py-5 gap-6">
          <div className="flex gap-2.5 justify-center">
            <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
              <span className="text-default-900 text-xl font-semibold">
                {" "}
                {"⭐"}How to use? 🤔
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-col">
            <span className="text-xs">
              follow these steps to get started with VoiceVibeAI:
            </span>
          </div>

          {/* // a list of steps to follow */}
          <div className="flex flex-col gap-2">
            <span className="text-md">
              {'1. Click on "Diary" tab in the sidebar.'}
            </span>
            <span className="text-md">
              {"2. You will see a list of your diary pages."}
            </span>
            <span className="text-md">
              {'3. Click on "New Page" to start a new page.'}
            </span>
            <span className="text-md">
              {"4. Speak or type to record your thoughts."}
            </span>
            <span className="text-md">
              {"5. You will see your mood analysis."}
            </span>
            <span className="text-md">
              {'6. Click "Ask AI" to chat with multiple AI character.'}
            </span>
            <span className="text-md">
              {"7. You can view and export all your pages."}
            </span>
          </div>
          <div>
            <div className="flex flex-col items-center ">
              <span className="text-sm italic">
                lets start recording your thoughts! 🚀
              </span>
              <div className=" pt-2  ">
                <Button
                  className="text-white"
                  color="primary"
                  onClick={() => {
                    window.location.href = siteConfig.links.pages;
                  }}
                >
                  Create a new page ➕
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
