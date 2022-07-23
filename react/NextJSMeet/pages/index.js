//Server Bundle
import { MongoClient } from "mongodb";

//Client Bundle
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>Relish Gathering</title>
        <meta
          name="description"
          content="Relish a gathering? Join Relish Gathering today"
        />
      </Head>
      <MeetupList meetups={props.gathering} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   //code written here also ONLY runs in the server - NEVER exposed to the client side
//   // fetch data from API or file system
//   return {
//     props: {
//       gathering: SAMPLE,
//     },
//   };
// };

export const getStaticProps = async () => {
  //code written here will not reach client side.

  //fetching data from API or file system
  const client = await MongoClient.connect(
    "mongodb+srv://@cluster0.b4d8r.mongodb.net/gatherings?retryWrites=true&w=majority"
  );
  const db = client.db();

  const gatheringCollection = db.collection("all-gathering");

  const allGathering = await gatheringCollection.find().toArray();

  client.close();

  return {
    props: {
      gathering: allGathering.map((gathering) => ({
        title: gathering.title,
        image: gathering.image,
        address: gathering.address,
        id: gathering._id.toString(),
      })),
    },
    revalidate: 7,
  };
};

export default Home;
