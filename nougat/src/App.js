import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getProductsData } from "./redux/actions/products";
import { getLocations } from "./redux/actions/locations";
import { updateMember } from "./redux/actions/member";
import MainContent from "./MainWebsite/MainContent";
import Header from "./MainWebsite/Header";
import Api from "./utils/Api";
import Calendar from "./utils/calendarSettings";

function App() {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const MainWebsite = () => (
    <>
      <Header />
      <MainContent />
    </>
  );

  Calendar.calendarSettings();

  useEffect(() => {
    Api.getProducts().then((products) => {
      dispatch(getProductsData(products));
    });

    Api.getLocations().then((allLocations) => {
      dispatch(getLocations(allLocations));
    });

    if (member.id) {
      Api.getMemberInfo(member.id).then((memberInfo) => {
        dispatch(updateMember(memberInfo));
      });
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/admin" />
        <Route path="/" component={MainWebsite} />
      </Switch>
    </Router>
  );
}

export default App;
