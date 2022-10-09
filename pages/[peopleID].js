import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Layout } from "antd";
const {  Content } = Layout;

const IdDescription = () => {
  const router = useRouter();
  const peopleID = router.query.peopleID;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(peopleID);
  }, []);

  const fetchData = (idnumber) => {
    setLoading(true);
    axios.get(`https://swapi.dev/api/people/${idnumber}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  if (data !== null) {
    return (
      <div>
        <Layout>
          <Layout style={{ display: "flex", justifyContent: "center" }}>
            <Link href="/">
              <h1 style={{ cursor: "pointer" }}> Back to Home Page</h1>
            </Link>
            <Content style={{ height: "100vh", margin: "0 auto" }}>
              <h3> Name - {data.name}</h3>
              <h3> DOB - {data.birth_year}</h3>
              <h3> Gender - {data.gender}</h3>
              <h3> Height - {data.height}</h3>
              <h3> Mass - {data.mass}</h3>
              <h3> Skin Colour - {data.skin_color}</h3>
              <h3> Eye Colour - {data.eye_color}</h3>
              <h3> Hair Colour - {data.hair_color}</h3>
              <div>
                <h1>Films</h1>
                {data.films.map((text, i) => {
                  return <h3 key={i}>{text}</h3>;
                })}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Wait for data to load
      </h1>
    );
  }
};

export default IdDescription;
