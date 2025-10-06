# Install
claude --dangerously-skip-permissions
npx claude-code-templates@latest
npx claude-code-templates@latest --create-agent development-team/frontend-developer
frontend-developer "your prompt here"
test-automator "your prompt"
ui-ux-designer "
'wsl.exe -d Ubuntu'

# Install Agents

npx claude-code-templates@latest --agent development-team/frontend-developer,development-team/backend-architect,development-team/ui-ux-designer,development-team/fullstack-developer,development-team/mobile-developer,development-team/devops-engineer,development-tools/debugger,development-tools/code-reviewer,development-tools/context-manager,development-tools/mcp-expert,development-tools/error-detective,development-tools/test-engineer,development-tools/performance-profiler,devops-infrastructure/cloud-architect,devops-infrastructure/security-engineer,ai-specialists/prompt-engineer,programming-languages/typescript-pro,programming-languages/javascript-pro,performance-testing/react-performance-optimization,performance-testing/test-automator,performance-testing/performance-engineer,expert-advisors/architect-review,expert-advisors/documentation-expert,expert-advisors/dependency-manager --hook "post-tool/run-tests-after-changes,development-tools/smart-formatting,automation/dependency-checker,development-tools/change-tracker,automation/simple-notifications,git-workflow/smart-commit,development-tools/lint-on-save,git-workflow/auto-git-add,testing/test-runner,development-tools/file-backup,development-tools/nextjs-code-quality-enforcer" --mcp "integration/memory-integration,integration/github-integration,database/postgresql-integration,browser_automation/playwright-mcp,browser_automation/playwright-mcp-server,browser_automation/browser-use-mcp-server"

npx claude-code-templates@latest --agent obsidian-ops-team/review-agent,ai-specialists/prompt-engineer,ai-specialists/task-decomposition-expert,business-marketing/payment-integration --command "documentation/create-architecture-documentation,utilities/ultra-think,git-workflow/commit,documentation/update-docs,deployment/add-changelog,utilities/code-review,utilities/refactor-code,project-management/todo,automation/workflow-orchestrator,project-management/create-prd,documentation/generate-api-documentation,project-management/create-feature,utilities/all-tools,orchestration/start,deployment/containerize-application,orchestration/commit,project-management/init-project,testing/generate-test-cases" --setting "statusline/colorful-statusline,permissions/allow-npm-commands,environment/development-utils" --hook "development-tools/lint-on-save,development-tools/change-tracker,git-workflow/auto-git-add,post-tool/format-python-files,development-tools/smart-formatting,development-tools/nextjs-code-quality-enforcer,post-tool/git-add-changes,security/file-protection,automation/vercel-environment-sync,automation/vercel-auto-deploy" --mcp "devtools/stripe"

# Allow
allow all npm commands, as they are often used for installing and updating packages. A rule like Bash(npm:*) will grant this permission.

JSON

{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Edit",
      "Write"
    ]
  }
}

# Changing Profiles

Of course. Here are the instructions specifically for a Windows PC using PowerShell to create easy switching commands for Claude Code.

Instructions for Windows PC (PowerShell)
This process will create two simple commands, Use-ClaudeDefault and Use-ClaudeZai, to let you switch between your standard Claude subscription and the Z.ai service.

Open Your PowerShell Profile
Open PowerShell and run the following command. This will open your profile file in Notepad, creating the file for you if it doesn't already exist.

Remove-Item Env:ANTHROPIC_BASE_URL
Remove-Item Env:ANTHROPIC_AUTH_TOKEN
notepad $PROFILE
# PowerShell
Use-ClaudeDefault
Use-ClaudeZai


# PowerShell

notepad $PROFILE
Add the Switching Functions
Copy the code below and paste it into the Notepad window that opens. Remember to replace "YOUR_ZAI_API_KEY" with your actual API key from Z.ai.

PowerShell

# Function to switch to standard Anthropic Claude
function Use-ClaudeDefault {
  Remove-Item Env:ANTHROPIC_BASE_URL -ErrorAction SilentlyContinue
  Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
  Write-Host "✅ Switched to standard Claude subscription."
}

# Function to switch to Z.ai (GLM)
function Use-ClaudeZai {
  $Env:ANTHROPIC_BASE_URL = "https://api.z.ai/api/anthropic"
  $Env:ANTHROPIC_AUTH_TOKEN = "YO2341f4ab58e94d90bb3ca234fec03bf9.R9TQdXlUW0YwazD7"
  Write-Host "✅ Switched to Z.ai (GLM) mode."
}
Save and Restart
Save the file in Notepad and then close it. You must restart your PowerShell terminal for the new commands to become active.

# PowerShell
Use-ClaudeDefault
Use-ClaudeZai


# Debug
  Test Debug Options:
  - npm run test:debug - Debug tests with inspector
  - npm run test:visual:debug - Debug visual tests with Playwright
  - npm run test:e2e:core:debug - Debug E2E tests with Playwright

  Development Debug:
  - npm run dev - Start development server (includes source maps)

  Playwright Debug Commands:
  - npm run test:visual:debug - Debug visual regression tests
  - npm run test:e2e:core:debug - Debug E2E tests
  - npm run test:e2e:core:headed - Run E2E tests in headed mode

  Debug Files Available:
  - debug-test.html - Test debugging interface
  - debug-visual-issues.html - Visual issues debugging
  - debug-ai-pipeline.js - AI pipeline debugging script

# z.ai

wsl
curl -O "http://bigmodel-us3-prod-marketplace.cn-wlcb.ufileos.com/1753683755292-30b3431f487b4cc1863e57a81d78e289.sh?ufileattname=claude_code_prod_zai.sh"
claude


setx ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
setx ANTHROPIC_AUTH_TOKEN "2341f4ab58e94d90bb3ca234fec03bf9.R9TQdXlUW0YwazD7"
setx SHELL "C:\Program Files\Git\bin\bash.exe"
npm install -g @anthropic-ai/claude-code --ignore-scripts

# Run this for WSL
wsl -e bash -lc 'cd /mnt/c/Users/hayde/Visual-E-commerce-Website-Editor && sudo apt update && sudo apt -y upgrade && curl -O "http://bigmodel-us3-prod-marketplace.cn-wlcb.ufileos.com/1753683755292-30b3431f487b4cc1863e57a81d78e289.sh?ufileattname=claude_code_prod_zai.sh" && chmod +x claude_code_prod_zai.sh && ./claude_code_prod_zai.sh'

wsl -e bash -lc "sed -n '1,200p' claude_code_prod_zai.sh"

{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "2341f4ab58e94d90bb3ca234fec03bf9.R9TQdXlUW0YwazD7",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000"
  }
}


# Install a complete development stack
npx claude-code-templates@latest --agent frontend-developer --command generate-tests --mcp github-integration

# Browse and install interactively
npx claude-code-templates@latest

# Install specific components
npx claude-code-templates@latest --agent security-auditor
npx claude-code-templates@latest --command optimize-bundle
npx claude-code-templates@latest --setting mcp-timeouts
npx claude-code-templates@latest --hook pre-commit-validation
npx claude-code-templates@latest --mcp postgresql-integration

# Agent to Use: containerize-application.md

Prompt:

Objective:
Your task is to create a complete, multi-container Docker environment for the VerifyAI project. This will allow us to run the entire full-stack application (frontend, backend, and database) in an isolated and consistent environment with a single command.

Execution Plan:

Analyze the Project: Review the 🖥️.frontend/package.json and ⚙️.backend/requirements.txt files to understand all dependencies for both services.

Create a Backend Dockerfile: In the ⚙️.backend/ directory, create a Dockerfile that sets up a Python environment, installs all necessary packages, and runs the FastAPI server.

Create a Frontend Dockerfile: In the 🖥️.frontend/ directory, create a Dockerfile that sets up a Node.js environment, installs all npm packages, and runs the Vite development server.

Create a docker-compose.yml File: In the project's root directory, create a docker-compose.yml file that defines and links all the necessary services:

frontend: The React application.

backend: The Python FastAPI application.

db: A PostgreSQL database service.

Ensure all services are configured to communicate with each other on the Docker network and that the necessary environment variables (for database connections, etc.) are correctly passed to each service.

Final Output:
Provide the complete contents for all three files (backend/Dockerfile, frontend/Dockerfile, docker-compose.yml) and the single command (docker-compose up) needed to launch the entire application stack.





npx claude-code-templates@latest --mcp "devtools/context7,integration/memory-integration,browser_automation/playwright-mcp-server,integration/github-integration,browser_automation/browser-use-mcp-server,browser_automation/playwright-mcp,database/postgresql-integration,web/web-fetch,database/supabase,filesystem/filesystem-access,devtools/just-mcp"

WSL
npx claude-code-templates@latest \
  --agent development-team/frontend-developer,development-team/backend-architect,development-team/ui-ux-designer,development-team/fullstack-developer,development-team/mobile-developer,development-team/devops-engineer,development-tools/debugger,development-tools/code-reviewer,development-tools/context-manager,development-tools/mcp-expert,development-tools/error-detective,development-tools/test-engineer,development-tools/performance-profiler,devops-infrastructure/cloud-architect,devops-infrastructure/security-engineer,ai-specialists/prompt-engineer,programming-languages/typescript-pro,programming-languages/javascript-pro,performance-testing/react-performance-optimization,performance-testing/test-automator,performance-testing/performance-engineer,expert-advisors/architect-review,expert-advisors/documentation-expert,expert-advisors/dependency-manager \
  --mcp "integration/memory-integration,integration/github-integration,database/postgresql-integration,browser_automation/playwright-mcp,browser_automation/playwright-mcp-server,browser_automation/browser-use-mcp-server"


---

# Use cases

# UI Component Update
ui-ux-designer > frontend-developer > test-automator > code-reviewer > devops-engineer

# Backend API Integration
backend-architect > fullstack-developer > test-automator > devops-engineer

# Performance Optimization
performance-engineer > frontend-developer > test-automator > code-reviewer > devops-engineer

# Security Vulnerability Fix
security-auditor > frontend-developer > backend-architect > fullstack-developer > test-automator > devops-engineer

# Bug Investigation & Resolution
Problem: A user reports that the "Export" feature is failing with an unhandled server error. The frontend shows a generic error message.

Workflow:
error-detective > debugger > fullstack-developer > test-automator > devops-engineer

# New Feature Implementation (Server-driven)
Problem: The business needs to add a new "Product Recommendations" section to the website that is powered by a backend algorithm.

Workflow:
business-analyst > backend-architect > data-scientist > fullstack-developer > devops-engineer

# Infrastructure Migration
Problem: The company is moving its deployment pipeline from Jenkins to GitHub Actions to improve automation and reduce maintenance overhead.

Workflow:
devops-engineer > nextjs-architecture-expert > devops-troubleshooter > test-automator > project-supervisor-orchestrator

# SEO & Performance Audit
Problem: The website is experiencing a drop in search engine rankings and a decline in organic traffic.

Workflow:
business-analyst > performance-engineer > react-performance-optimizer > test-automator > content-marketer

---

How to Run Claude Code on Windows (without WSL)
This approach assumes you have Git for Windows already installed, as it provides the bash.exe and other Unix-like tools needed.

Install Node.js: First, ensure you have Node.js (version 18 or higher) installed on your Windows machine. Download and run the official installer from the Node.js website.

Configure Environment Variables for Claude Code: The key is to set the environment variables in Windows itself so they are globally available to your command line.

Open a PowerShell terminal as an Administrator.

Set the API key and base URL using setx so the variables are persistent.

PowerShell

setx ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
setx ANTHROPIC_AUTH_TOKEN "2341f4ab58e94d90bb3ca234fec03bf9.R9TQdXlUW0YwazD7"
Remember to replace "your Zhipu API key" with your actual key.

Configure Git Bash: Claude Code relies on a Bash shell for some of its functions. You need to tell it where to find this shell.

Set a global environment variable pointing to the bash.exe that came with your Git installation.

PowerShell

setx SHELL "C:\Program Files\Git\bin\bash.exe"
(Note: The path might be slightly different depending on your Git installation, so double-check it.)

Install Claude Code: Now, install the Claude Code package globally using npm.

Open a new PowerShell terminal (not as an administrator).

Run the install command. The --ignore-scripts flag can help prevent errors during installation by bypassing platform-specific scripts.

PowerShell
npm install -g @anthropic-ai/claude-code --ignore-scripts

Restart and Run:

Close all your terminal windows.

Open a new terminal (either PowerShell or Command Prompt).

Navigate to your project folder (cd C:\Users\hayde\Visual-E-commerce-Website-Editor).

Run the claude command.

This setup should allow you to run Claude Code from any Windows terminal that has access to the global npm packages and the Git Bash shell.

---

# Swithcing Between Accounts

Option 1: Using a Windows Terminal (after completing the manual setup)
If you have completed the manual setup instructions for Windows I provided earlier, you can use these commands in a PowerShell terminal:

To use Claude Pro (Anthropic):

PowerShell

claude config set -g ANTHROPIC_BASE_URL "https://api.anthropic.com/v1"
claude config set -g ANTHROPIC_AUTH_TOKEN "your Anthropic API key"
To use Z.AI:

PowerShell

claude config set -g ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
claude config set -g ANTHROPIC_AUTH_TOKEN "2341f4ab58e94d90bb3ca234fec03bf9.R9TQdXlUW0YwazD7"
Option 2: Using the WSL Terminal
Since your current working environment is WSL, you can use these commands to switch between the two:

To use Claude Pro (Anthropic):

Bash

claude config set -g ANTHROPIC_BASE_URL "https://api.anthropic.com/v1"
claude config set -g ANTHROPIC_AUTH_TOKEN "your Anthropic API key"
To use Z.AI:

Bash

claude config set -g ANTHROPIC_BASE_URL "https://open.bigmodel.cn/api/anthropic"
claude config set -g ANTHROPIC_AUTH_TOKEN "your Zhipu API key"
Remember: The --mcp command you used earlier to install the agents will also install the necessary configurations and agent files that are separate from the API key. You only need to run the claude config set command to switch between services.

---

Claude Code v1.0.117

 Always review Claude's responses, especially when running code. Claude has read   
 access to files in the current directory and can run commands and edit files with 
  your permission.

 Usage Modes:
 • REPL: claude (interactive session)
 • Non-interactive: claude -p "question"

 Run claude -h for all command line options

 Common Tasks:
 • Ask questions about your codebase > How does foo.py work?
 • Edit files > Update bar.ts to...
 • Fix errors > cargo build
 • Run commands > /help
 • Run bash commands > !ls

 Interactive Mode Commands:
  /add-dir - Add a new working directory
  /agents - Manage agent configurations
  /bashes - List and manage background tasks
  /clear - Clear conversation history and free up context
  /compact - Clear conversation history but keep a summary in context. Optional:   
  /compact [instructions for summarization]
  /component - React Component Generator (project)
  /config - Open config panel
  /context - Visualize current context usage as a colored grid
  /cost - Show the total cost and duration of the current session
  /debug - Debug Assistant (project)
  /doctor - Diagnose and verify your Claude Code installation and settings
  /exit - Exit the REPL
  /export - Export the current conversation to a file or clipboard
  /feedback - Submit feedback about Claude Code
  /help - Show help and available commands
  /hooks - React Hooks (project)
  /hooks - Manage hook configurations for tool events
  /ide - Manage IDE integrations and show status
  /init - Initialize a new CLAUDE.md file with codebase documentation
  /install-github-app - Set up Claude GitHub Actions for a repository
  /lint - Lint Assistant (project)
  /login - Sign in with your Anthropic account
  /logout - Sign out from your Anthropic account
  /mcp - Manage MCP servers
  /memory - Edit Claude memory files
  /migrate-installer - Migrate from global npm installation to local installation  
  /model - Set the AI model for Claude Code
  /npm-scripts - NPM Scripts Assistant (project)
  /output-style - Set the output style directly or from a selection menu
  /output-style:new - Create a custom output style
  /permissions - Manage allow & deny tool permission rules
  /pr-comments - Get comments from a GitHub pull request
  /privacy-settings - View and update your privacy settings
  /refactor - Code Refactoring Assistant (project)
  /release-notes - View release notes
  /resume - Resume a conversation
  /review - Review a pull request
  /security-review - Complete a security review of the pending changes on the      
  current branch
  /state-management - React State Management (project)
  /status - Show Claude Code status including version, model, account, API
  connectivity, and tool statuses
  /statusline - Set up Claude Code's status line UI
  /terminal-setup - Install Shift+Enter key binding for newlines
  /test - Test Assistant (project)
  /todos - List current todo items
  /typescript-migrate - TypeScript Migration Assistant (project)
  /upgrade - Upgrade to Max for higher rate limits and more Opus
  /vim - Toggle between Vim and Normal editing modes

 Learn more at: https://docs.anthropic.com/s/claude-code