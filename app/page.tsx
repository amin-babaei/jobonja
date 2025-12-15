import CreateResume from "@components/CreateResume";
import Header from "./_components/header/Header";
import StartGuide from "./_components/StartGuide";
import RecentJobs from "./jobs/recent_jobs/RecentJobs";

export default function Home() {

  return <>
    <Header />
    <StartGuide />
    <RecentJobs />
    <CreateResume />
  </>;
}
