import { test, expect } from '@playwright/test';
import {SignInPage} from "../pages/SignInPage";
import {authSessionFile, createTestUser, generateAuthTest} from "../core/auth";

generateAuthTest()()