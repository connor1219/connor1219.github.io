export type ProjectItem = {
  id: string;
  imageSrc: string;
  title: string;
  body: string;
  link?: string;
};

export enum Category {
  GENERAL = "general",
  FISHING = "fishing"
}

export const PROJECTS: Record<Category, ProjectItem[]> = {
  [Category.GENERAL]: [
    {
      id: "devply",
      imageSrc: "/icon/devply2.png",
      title: "Devply",
      body: "A two-sided municipal development application tracking system for City Planners and Developers",
      link: "https://devply.com",
    },
    {
      id: "fish",
      imageSrc: "/icon/coming-soon.png",
      title: "Coming Soon",
      body: "Now you're probably thinking to yourself, 'Surely he didn't make a website just to showcase one project right?'. Well you should click on the fish.",
    },
  ],
  [Category.FISHING]: [
    { id: "bass", imageSrc: "/icon/bass-catch.png", title: "Good ol' Bass Fishing", body: "Nothing more fun than fighting a bass on some lightweight gear. They'll hit just about anything, even my bright pink lure" },
    { id: "lake-trout", imageSrc: "/icon/lake-trout-catch.png", title: "Lake Trout Jigging", body: "This was my first ever lake trout, I was in over 60ft of water and said screw it, let's put something at the bottom, and sure enough, I pulled out this guy!" },
    { id: "salmon", imageSrc: "/icon/salmon-catch.png", title: "Salmon Run", body: "My first ever King Salmon, probably my proudest fishing moment. I had spent easily 30 hours fishing over the course of a week without even a bite and on the last day of fishing this guy slammed my glow spoon. I fought this thing on bass gear for well over 15 minutes, by some miracle I was able to get it into my pier net and onto shore." },
    { id: "walleye", imageSrc: "/icon/walleye-catch.png", title: "Walleye Through The Ice", body: "I flew out to Winnipeg in a snowstorm for this pic. Nearly put our entire truck through the ice driving back home too. That was a crazy trip. Can't wait to do it again next year!" },
  ],
};