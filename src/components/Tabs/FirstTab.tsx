import React from "react";

import Card from "./Card";

export default function FirstTab(): JSX.Element {
  return (
    <div className="FirstTab flex h-full w-full flex-col flex-wrap space-y-5">
      <Card />
      <Card />
      <Card />
    </div>
  );
}
