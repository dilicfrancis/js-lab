//Server bundle
import { MongoClient, ObjectId } from "mongodb";

//Client bundle
import Head from "next/head";
import GatheringDetail from "../../components/meetups/MeetupDetail";

const GatheringDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.gatheringData.title}</title>
        <meta name="description" content={props.gatheringData.description} />
      </Head>
      <GatheringDetail
        image={props.gatheringData.image}
        title={props.gatheringData.title}
        address={props.gatheringData.address}
        description={props.gatheringData.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  //fetching data from API or file system
  const client = await MongoClient.connect(
    "mongodb+srv://nextAdmin:next111@cluster0.b4d8r.mongodb.net/gatherings?retryWrites=true&w=majority"
  );
  const db = client.db();

  const gatheringCollection = db.collection("all-gathering");

  const allGathering = await gatheringCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: allGathering.map((gathering) => ({
      params: { gatheringId: gathering._id.toString() },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const gatheringId = context.params.gatheringId;

  //fetching data from API or file system
  const client = await MongoClient.connect(
    "mongodb+srv://nextAdmin:next111@cluster0.b4d8r.mongodb.net/gatherings?retryWrites=true&w=majority"
  );
  const db = client.db();

  const gatheringCollection = db.collection("all-gathering");

  const selectedGathering = await gatheringCollection.findOne({
    _id: ObjectId(gatheringId),
  });

  client.close();

  return {
    props: {
      gatheringData: {
        id: selectedGathering._id.toString(),
        title: selectedGathering.title,
        image: selectedGathering.image,
        address: selectedGathering.address,
        description: selectedGathering.description,
      },
    },
  };
};

export default GatheringDetails;
