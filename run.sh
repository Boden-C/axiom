#!/bin/bash

# --- Configuration Section ---
CONFIGURED_REMOTE_URL="https://github.com/your/repo.git"
SUCCESS_ICON="✓"
WARNING_ICON="⚠"
ERROR_ICON="✗"
HORIZONTAL_BAR="────────────────────────────"
COLOR_RED="\033[0;31m"
COLOR_GREEN="\033[0;32m"
COLOR_YELLOW="\033[0;33m"
COLOR_RESET="\033[0m"

function git() {
  # 1. Check if Git is installed
  if ! command -v git &> /dev/null; then
    echo -e "${COLOR_RED}${ERROR_ICON} Git is not installed. Exiting.${COLOR_RESET}"
    exit 1
  fi

  # 2. Check if Git repository is initialized
  if [ ! -d ".git" ]; then
    echo -e "${COLOR_YELLOW}${WARNING_ICON} No Git repository found. Initializing one...${COLOR_RESET}"
    git init &> /dev/null
  fi

  # 3. Validate remote origin
  current_origin=$(git remote get-url origin 2>/dev/null)
  if [ -z "$current_origin" ]; then
    if [ -n "$CONFIGURED_REMOTE_URL" ]; then
      echo -e "${COLOR_YELLOW}${WARNING_ICON} Remote origin missing. Setting it to configured URL.${COLOR_RESET}"
      git remote add origin "$CONFIGURED_REMOTE_URL" &> /dev/null
    else
      echo -e "${COLOR_RED}${ERROR_ICON} No remote origin configured. Exiting.${COLOR_RESET}"
      exit 1
    fi
  elif [ "$current_origin" != "$CONFIGURED_REMOTE_URL" ]; then
    echo -e "${COLOR_YELLOW}${WARNING_ICON} Remote origin differs from configured URL.${COLOR_RESET}"
  fi

  # 4. Fetch the origin and get the remote default branch
  git fetch origin &> /dev/null
  DEFAULT_BRANCH=$(git remote show origin 2>/dev/null | awk '/HEAD branch/ {print $NF}')
  if [ -z "$DEFAULT_BRANCH" ]; then
    echo -e "${COLOR_RED}${ERROR_ICON} Could not determine the remote default branch. Exiting.${COLOR_RESET}"
    exit 1
  fi

  # 4.5. If local repository has no commits, check out tracking branch from remote
  if ! git rev-parse --verify HEAD &> /dev/null; then
    echo -e "${COLOR_YELLOW}${WARNING_ICON} No commits found locally. Checking out tracking branch for ${DEFAULT_BRANCH}...${COLOR_RESET}"
    git checkout -t origin/"$DEFAULT_BRANCH" &> /dev/null
  fi

  # 5. Display current branch with Unicode icons
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  branch_icon="⎇"
  if [ "$current_branch" == "$DEFAULT_BRANCH" ]; then
    branch_icon="★"
  fi
  echo -e "${COLOR_GREEN}Current Branch: ${branch_icon} ${current_branch}${COLOR_RESET}"
  echo -e "Cancel (Ctrl+C) if you want to switch branches"
  if [ "$current_branch" == "master" ]; then
    echo -e "${COLOR_YELLOW}${WARNING_ICON} Warning: 'master' branch is deprecated. Consider switching to '${DEFAULT_BRANCH}'.${COLOR_RESET}"
  fi

  # 6. Attempt to automatically update
  update_output=$(git pull --rebase 2>&1)
  pull_status=$?

  if echo "$update_output" | grep -q "Already up to date"; then
    # No update required; silent on no updates.
    :
  else
    echo -e "$HORIZONTAL_BAR"
    if [ $pull_status -eq 0 ]; then
      commit_info=$(git log -1 --pretty=format:"%h by %an (%ar)")
      echo -e "${COLOR_GREEN}${SUCCESS_ICON} Updated to ${commit_info}${COLOR_RESET}"
    else
      # Check for merge conflicts
      if echo "$update_output" | grep -qi "CONFLICT"; then
        echo -e "${COLOR_YELLOW}${WARNING_ICON} $(echo "$update_output" | grep -o '[0-9]\+ new commit' | head -1) new commits detected. Merge conflicts encountered."
        echo -e "${WARNING_ICON} Automatic update failed due to merge conflicts. Please run 'git pull' manually."
        git rebase --abort &> /dev/null
      else
        echo -e "${COLOR_RED}${ERROR_ICON} Automatic update failed. Manual intervention required:"
        echo -e "$update_output"
      fi
    fi
    echo -e "$HORIZONTAL_BAR"
  fi
}

# Call the function
git
