import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { UserContext } from '../context/UserContext'

function Transaction() {
    
    const navigate = useNavigate()
    const [state] = useContext(UserContext)

    const checkAuth = () => {
        if (state.isLogin === false) {
            navigate("/")
        } else if (state.user.status === "customer") {
            navigate("/dashboard")
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

  return (
    <>
    <Header />
    <Container>
    <main className="mt-5 pay-table">
      <section className="pt-4 mx-5">
          <h1 className="txt-white mb-5">Incoming Transaction</h1>
          <table className="w-100">
            <thead className="bg-navy">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
              </tr>
            </thead>
            <tbody>
                          
              <tr>
                <td>1</td>
                <td>Riki</td>
                <td>Name Product</td>
                <td>1000</td>
                <td>Waiting</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Riki</td>
                <td>Name Product</td>
                <td>1000</td>
                <td>Waiting</td>
              </tr>
            </tbody>
          </table>
      </section>
    </main>
    </Container>
    </>
  )
}

export default Transaction