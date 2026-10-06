<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All editable wedding content lives in src/config/wedding.ts; components only read from it, so details change without touching UI.
- Render couple names and initials groom-first everywhere; derive the favicon from the same monogram to keep branding consistent.
- Acceptance confirmation uses a portaled accessible dialog with viewport-constrained content so reveal transforms cannot break its positioning.
- Keep venue times and the acceptance destination in wedding configuration, independent of the calendar start, so changing the reception cannot move the ceremony event.
