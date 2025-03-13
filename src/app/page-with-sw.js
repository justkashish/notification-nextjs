import Home from "./page"
import SwRegister from "./sw-register"

export default function HomeWithSw() {
  return (
    <>
      <SwRegister />
      <Home />
    </>
  )
}

