import React, { useEffect, useState } from "react";
import BackBar from "../../components/Navbar/BackBar.jsx";
import Container from "../../containers/Container.jsx";
import RequestCard from "../../components/Cards/RequestCard.jsx";
import api from "../../config/apiConfig.js";
import Loader from "../../components/UI/Loader.jsx";
const DashBoard = () => {
  const [requestList, setRequestList] = useState([]);
  const [update,setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await api.get("/api/v1/channels/requests/all");
      setRequestList(response?.data?.channels);
      console.log(response?.data?.channels);
      setLoading(false);
    })();
  }, [update]);
  return (
    <React.Fragment>
      <BackBar pageLabel={"DashBoard"} />
      <Container
        className={"w-full px-2 flex flex-col items-center text-center"}
      >
        {/* Container for demo purpose */}
        <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
          {/*Section: Design Block*/}
          <section className="mb-20 text-gray-800">
            <div className="block rounded-lg shadow-lg bg-white">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full mb-0">
                        <thead className="border-b bg-gray-50 rounded-t-lg text-left">
                          <tr>
                            <th
                              scope="col"
                              className="rounded-tl-lg text-sm font-medium px-6 py-4"
                            >
                              NAME
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium px-6 py-4"
                            >
                              TITLE
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium px-6 py-4"
                            >
                              STATUS
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium px-6 py-4"
                            >
                              Action
                            </th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          <div className="flex justify-center">
                          {loading&&<Loader/>}
                          </div>
                          {requestList.map((request) => {
                            return (
                              <RequestCard setUpdate={setUpdate} key={request._id} {...request} />
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Section: Design Block*/}
        </div>
        {/* Container for demo purpose */}
      </Container>
    </React.Fragment>
  );
};

export default DashBoard;

