import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

function Transaction() {
  const title = "Income Transaction";
  document.title = "Coways | " + title;

  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === false) {
      navigate("/");
    } else if (state.user.status === "customer") {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    // console.log(response)
    return response.data.data;
  });

  // console.log("===>", transactions);

  return (
    <>
      <Header />
      <Container className="mt5">
        <main className="mt-5 pay-table">
          <section>
            <h1 className="txt-white mb-5">Incoming Transaction</h1>
            <table className="w-100">
              <thead className="bg-navy">
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Remaining</th>
                  <th>Status User</th>
                  <th>Status Payment</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((item, index) => (
                  <tr>
                    <td>{index+1}</td>
                    <td>{item?.user.name}</td>
                    <td>{item?.ammount}</td>
                    <td>{item?.remaining_active}</td>
                    <td>{item?.subscription}</td>
                    <td>{item?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </Container>
    </>
  );
}

export default Transaction;
