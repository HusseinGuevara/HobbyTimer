import React, { useState } from "react";
import { Button, Card, Container, Group, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { AppleLogoIcon, GoogleLogoIcon } from "./icons";

export default function AuthScreen({
  baseUrl,
  authEmailInput,
  authPasswordInput,
  authStatus,
  authChecked,
  hasFirebaseConfigured,
  onEmailChange,
  onPasswordChange,
  onGoogleSignIn,
  onAppleSignIn,
  onSignUp,
  onLogIn,
}) {
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";

  return (
    <div className="app-bg">
      <Container size="sm" py="xl">
        <Stack gap="md">
          <div className="login-logo-wrap">
            <img className="hero-logo" src={`${baseUrl}progressxp-logo.png`} alt="Progress XP logo" />
          </div>

          <Card radius="xl" shadow="sm" withBorder className="glass-card cloud-card">
            <Stack gap="sm">
              <Title order={3}>{isLogin ? "Log In" : "Create Account"}</Title>
              <Text c="dimmed" size="sm">
                {isLogin
                  ? "Log in to sync your Progress XP data across devices."
                  : "Create an account to unlock Progress XP and stay logged in across sessions."}
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  value={authEmailInput}
                  onChange={(event) => onEmailChange(event.currentTarget.value)}
                />
                <TextInput
                  type="password"
                  label="Password"
                  placeholder="At least 6 characters"
                  value={authPasswordInput}
                  onChange={(event) => onPasswordChange(event.currentTarget.value)}
                />
              </SimpleGrid>
              <Group className="social-auth-row">
                <Button
                  className="auth-provider-btn google-btn"
                  variant="light"
                  leftSection={<GoogleLogoIcon />}
                  onClick={onGoogleSignIn}
                >
                  Continue with Google
                </Button>
                <Button
                  className="auth-provider-btn apple-btn"
                  variant="light"
                  leftSection={<AppleLogoIcon />}
                  onClick={onAppleSignIn}
                >
                  Continue with Apple
                </Button>
              </Group>
              <Group>
                {isLogin ? (
                  <Button onClick={onLogIn}>Log In</Button>
                ) : (
                  <Button onClick={onSignUp}>Create Account</Button>
                )}
              </Group>
              <Text size="sm" c="dimmed">
                {isLogin ? "Need an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => setMode(isLogin ? "signup" : "login")}
                >
                  {isLogin ? "Create one" : "Go back to login"}
                </button>
              </Text>
              {!hasFirebaseConfigured ? (
                <Text size="sm" c="dimmed">
                  Login is not available yet. Firebase sign-in providers must be enabled.
                </Text>
              ) : null}
              {hasFirebaseConfigured && !authChecked ? (
                <Text size="sm" c="dimmed">Checking saved session...</Text>
              ) : null}
              {authStatus ? <Text size="sm" c="blue" className="status-text">{authStatus}</Text> : null}
            </Stack>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
