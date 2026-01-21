import { Route, Redirect } from "wouter";
import { isLoggedIn } from "../lib/auth";

export default function ProtectedRoute({ component: Component, ...rest }: any) {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} component={Component} />;
}
