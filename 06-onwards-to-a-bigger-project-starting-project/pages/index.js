import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { mongo_client } from "../utils/client";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="title" key="title" content="React Meetups" />
        <meta name="description" key="description" content="Page with React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps(context) {
  // fetch data from an API
  const client = await MongoClient.connect(
    `${mongo_client}/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    }, // will be passed to the page component as props
    revalidate: 1,
  };
}

export default HomePage;
