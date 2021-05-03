import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";

import {
  Box,
  Button,
  Heading,
  Text,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

async function fetcher(url: string) {
  const resp = await fetch(url);
  return resp.text();
}

function Index(): JSX.Element {
  const { data, error } = useSWR("/api", fetcher, { refreshInterval: 1000 });
  const { colorMode, toggleColorMode } = useColorMode();
  const [number, setNumber] = useState<number>(0);

  return (
    <Box padding="3">
      <Switch onChange={toggleColorMode} />
      <Heading as="h1">Hello, world!</Heading>
      <Text fontSize="md">
        This is <code>pages/index.tsx</code>.
      </Text>
      <Text fontSize="md">
        Check out <Link href="/foo">foo</Link>.
      </Text>

      <Heading as="h2">Memory allocation stats from Go server</Heading>
      {error && (
        <p>
          Error fetching profile: <strong>{error}</strong>
        </p>
      )}
      {!error && !data && <Text fontSize="md">Loading ...</Text>}
      {!error && data && <pre>{data}</pre>}
      <Heading>My number is {number}</Heading>
      <Button
        leftIcon={<AddIcon />}
        onClick={() => setNumber((number) => number + 1)}
        variant="solid"
        colorScheme="blue"
      >
        Increment number
      </Button>
    </Box>
  );
}

export default Index;
