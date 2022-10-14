/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css"
// import { useState } from "react";

export const FormDate = qwikify$(()=>{
    // const [value, setValue] = useState<DateRange>([null,null])

    return (<div>
        <DateRangePicker />
    </div>)
})