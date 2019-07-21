import express from "express";
import Wrapper from "./Wrapper";

export default interface Application {
  express(): express.Application;
  applyWrappers(...wrappers: Wrapper[]): Application;
}
