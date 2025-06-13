import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="6"
      minHeight="100vh"
    >
      <Heading size="8">DotCode Test Task</Heading>
      <Flex direction="row" align="center" gap="8">
        <Button asChild className="!cursor-pointer" variant="solid">
          <Link href="/workspace">Go to Workspace</Link>
        </Button>
        <Button asChild className="!cursor-pointer" variant="solid">
          <Link href="/transactions">Go to Transactions</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
