# Copilot / Agent Instructions (draft)

Purpose
- Provide concise, repo-scoped instructions for the coding assistant to follow when working in this workspace.

Scope
- Default: apply to all files in this repository unless the user specifies exclusions below.

Core Rules (recommended)
- Use the `manage_todo_list` tool to plan and track multi-step tasks; start each multi-step task by creating a todo list.
- Before any non-trivial tool call or batch of tool calls, send a one-line preamble describing what will be done next.
- Use `apply_patch` for all file edits and prefer minimal, focused diffs that preserve project style.
- When referring to filenames or symbols in chat, wrap filenames in backticks (e.g., `src/index.js`).
- Keep messages concise and action-oriented; prefer short bullet lists and clear next steps.
- For codebase exploration use the provided search subagents (e.g., `search_subagent`) rather than ad-hoc grep when possible.

Editing & Testing
- When creating runnable code or making notable edits, include a minimal README or short test harness and basic run instructions.
- Run available tests or build commands if feasible and report results; do not attempt to fix unrelated failing tests.

Clarifying Preferences (need user confirmation)
- Model disclosure: Should the agent state the model name when asked? (proposal: only disclose if explicitly requested.)
- Enforcement scope: Apply these rules everywhere, only to source files, or only to future PRs?
- Strictness: Which rules are hard requirements vs. soft preferences?

Examples (prompts to the assistant)
- "Follow repo rules: create a todo plan, then implement X using `apply_patch`."
- "Edit `ImageDraw.js` to add feature Y; show tests and run instructions."

Next steps
1. Confirm the clarifying preferences above.
2. I will update this file to reflect any decisions and produce example prompts and tests.

---
Questions for you
1. Should these instructions apply to the entire workspace or only specific file types (e.g., JS/TS)?
2. Are the core rules above acceptable as hard rules, or should some be treated as preferences? Please mark which.
3. Do you want the agent to always run tests/build after edits when possible?
4. Any other conventions you want enforced (naming, formatting, commit message style)?
