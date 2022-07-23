import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewGathering = () => {
  const router = useRouter();

  const addGatheringHandler = async (UserData) => {
    const response = await fetch("/api/new-gathering", {
      method: "POST",
      body: JSON.stringify(UserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    console.log(resData);
    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>Create a Gathering</title>
        <meta
          name="description"
          content="Create your next gathering on Relish"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addGatheringHandler} />
    </>
  );
};

export default NewGathering;
