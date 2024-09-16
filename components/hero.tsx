import {
  FingerPrintIcon,
  HeartIcon,
  LanguageIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import { siteConfig } from "@/config/site";

export default function Home() {
  const features = [
    {
      name: "Voice-to-Text Transcription",
      description:
        "We use Web Speech API to transcribe your voice into text in real-time.",
      icon: LanguageIcon,
    },
    {
      name: "Emotion Analysis",
      description:
        "Our AI analyzes your voice to detect emotions and provide insights.",
      icon: HeartIcon,
    },
    {
      name: "AI Conversations",
      description:
        "Engage with different AI characters to discuss your thoughts and feelings.",
      icon: UserPlusIcon,
    },
    {
      name: "Seamless Security",
      description:
        "Your data is encrypted and stored securely with end-to-end encryption.",
      icon: FingerPrintIcon,
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-800">
        {/* hero */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-28 sm:py-38 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl text-gray-900 dark:text-gray-100">
                VoiceVibeAI 👩‍🦰
                <br />
                <span> your </span>
                <span className="text-fuchsia-500">Personal</span>
                <br />
                Audio Diary
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Effortlessly document your thoughts, track your mood, and
                reflect on your journey with VoiceVibe AI.
                <br />
                <span className="font-sans italic">
                  {" "}
                  Your voice, your story, secured and analyzed with cutting-edge
                  technology.
                </span>
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  href={siteConfig.navMenuItems[0].href}
                >
                  Get started ✨
                </a>
                <a
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                  href={siteConfig.links.github}
                >
                  Learn more 🤔 <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        {/* features */}
        <div className="mx-auto max-w-7xl pt-20 px-6 lg:px-8 dark:bg-gray-800">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              wanna know more?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              What we offer
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              the goal at VoiceVibeAi is simple, a clean and easy to use audio
              diary that allows you to document your thoughts, track your mood,
              and chat with different AI characters to feel better.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        {/* working */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8 pb-20 pt-36">
          <h2 className="text-2xl font-bold mb-2">How It Works?🤔</h2>
          <p className="mb-5">
            Here is a simple 4-step process explaining how our project works:
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center md:space-x-10 p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-gray-200 p-5">
            <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-5">
              <span aria-label="emoji" className="text-6xl" role="img">
                📥
              </span>
              <p>Data input, saving</p>
            </div>
            <div className="hidden md:flex items-center mx-5">
              <span aria-label="arrow" className="text-4xl" role="img">
                ➡️
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-5">
              <span aria-label="emoji" className="text-6xl" role="img">
                🔍
              </span>
              <p>Emotion analysis</p>
            </div>
            <div className="hidden md:flex items-center mx-5">
              <span aria-label="arrow" className="text-4xl" role="img">
                ➡️
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-5">
              <span aria-label="emoji" className="text-6xl" role="img">
                💬
              </span>
              <p>Character based chat with context</p>
            </div>
            <div className="hidden md:flex items-center mx-5">
              <span aria-label="arrow" className="text-4xl" role="img">
                ➡️
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 border-2 border-gray-200 p-5">
              <span aria-label="emoji" className="text-6xl" role="img">
                📊
              </span>
              <p>Mood analysis chart</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
