#!/usr/bin/env node

import { Command } from "commander";
import { handleCreateCommand } from "./main";
import { CLIOptions } from "./types";
const pkg = require("../package.json");

const program = new Command();

program
  .version(pkg.version)
  .command("create")
  .description("Create a new Pull/Merge Request with AI")
  .option(
    "-t, --type <type>",
    "Type of PR (feature, bug, refactor, chore, docs)"
  )
  .option("-b, --base <base>", "Destination branch (e.g., main, develop)")
  .option("-p, --provider <provider>", "Git platform (GitHub or GitLab)")
  .action((options: CLIOptions) => {
    handleCreateCommand(options);
  });

program.parse(process.argv);
