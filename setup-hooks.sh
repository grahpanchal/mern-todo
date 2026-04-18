#!/bin/bash

# ╔══════════════════════════════════════════╗
# ║   MERN Todo - Git Hook Auto Push Setup  ║
# ╚══════════════════════════════════════════╝

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🪝 Git Hook Setup - Auto Push Script  ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not a git repository!${NC}"
    echo -e "${YELLOW}   Please run: git init${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Creating post-commit hook...${NC}"

# Create the post-commit hook
cat > .git/hooks/post-commit << 'HOOKSCRIPT'
#!/bin/bash

# ╔══════════════════════════════════════╗
# ║     Auto Push Hook - MERN Todo      ║
# ╚══════════════════════════════════════╝

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Get last commit message
COMMIT_MSG=$(git log -1 --format="%s")

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}  🚀 Auto Push Triggered!${NC}"
echo -e "  📌 Branch : ${GREEN}$BRANCH${NC}"
echo -e "  💬 Commit : $COMMIT_MSG"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${RED}❌ No remote 'origin' found!${NC}"
    echo -e "${YELLOW}   Run: git remote add origin <your-repo-url>${NC}"
    exit 1
fi

echo -e "${YELLOW}⬆️  Pushing to GitHub...${NC}"

# Push to GitHub
git push origin "$BRANCH"

# Check if push was successful
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}  ✅ Successfully pushed to GitHub!${NC}"
    echo -e "${GREEN}  🌿 Branch: $BRANCH${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
else
    echo ""
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}  ❌ Push failed!${NC}"
    echo -e "${RED}  Check your GitHub authentication.${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
fi
echo ""
HOOKSCRIPT

# Make hook executable
chmod +x .git/hooks/post-commit

echo -e "${GREEN}✅ post-commit hook created!${NC}"
echo ""
echo -e "${YELLOW}📁 Creating pre-push hook (safety check)...${NC}"

# Create pre-push hook for safety check
cat > .git/hooks/pre-push << 'PREPUSHSCRIPT'
#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Warn if pushing directly to main
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Pushing directly to ${BRANCH}...${NC}"
    echo -e "${GREEN}   Proceeding with auto-push ✅${NC}"
    echo ""
fi

exit 0
PREPUSHSCRIPT

chmod +x .git/hooks/pre-push

echo -e "${GREEN}✅ pre-push hook created!${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  🎉 Git Hooks Setup Complete!${NC}"
echo ""
echo -e "  Now just run:"
echo -e "  ${YELLOW}git add .${NC}"
echo -e "  ${YELLOW}git commit -m 'your message'${NC}"
echo -e "  ${GREEN}→ Auto push ho jayega! 🚀${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
