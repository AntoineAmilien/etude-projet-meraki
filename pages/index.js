export default function Home() {
  return (
    <></>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/meraki/organization/organizations",
    },
    props: {},
  };
}
