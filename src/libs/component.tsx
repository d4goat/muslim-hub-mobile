import { Children } from "react";

export const If = ({ isTrue, children }: { isTrue: boolean, children: any }) => isTrue ? children : null