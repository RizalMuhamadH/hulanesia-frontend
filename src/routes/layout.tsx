import { component$, createContext, Slot } from "@builder.io/qwik";
import moment from "moment";
// import Header from '../components/header/header';

export const deviceContext = createContext("device-context");

export default component$(() => {
  moment.locale("id");

  return (
    <>
      <Slot name="header" />
      <Slot />
      <Slot name="footer" />
    </>
  );
});
