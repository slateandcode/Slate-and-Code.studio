"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/anim";
import type { OptionGroup } from "@/lib/inquiry";

/* the one horizontal inset for group labels and rows alike, in px so the
   micro labels and the larger option text share a left edge */
const INSET = "px-[clamp(14px,1.1vw,22px)]";

/* ---------------------------------------------------------------------------
   A select in the house dress, replacing the browser's native dropdown, which
   renders in the system font, system colours, and system spacing whatever
   the page asks for.

   The trigger is the same underline field as the inputs beside it. The list
   opens under it as a solid panel: group names as micro labels over a
   hairline, the option on the left, its price on the right, and an accent dot
   on the chosen one.

   It follows the select-only combobox pattern: focus stays on the trigger,
   arrows move through the options, Enter or Space picks, Escape closes, and
   the value is carried to the form by a hidden input so FormData reads it
   like any other field.
--------------------------------------------------------------------------- */

export default function Listbox({
  id,
  name,
  labelId,
  placeholder,
  groups,
  fieldClassName,
}: {
  id: string;
  name: string;
  /* the visible <label>, which names the control */
  labelId: string;
  placeholder: string;
  groups: OptionGroup[];
  /* the underline field classes, shared with the inputs */
  fieldClassName: string;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const flat = groups.flatMap((g) => g.options);
  const selected = flat.find((o) => o.value === value);
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;

  /* a press anywhere outside closes it */
  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  /* keep the highlighted option inside the panel's scroll, moving only the
     panel: scrollIntoView would drag the page along with it */
  useEffect(() => {
    const list = listRef.current;
    const el = open ? document.getElementById(optionId(active)) : null;
    if (!list || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
  }, [open, active]);

  const show = () => {
    setActive(Math.max(0, flat.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const choose = (i: number) => {
    setValue(flat[i].value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = flat.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(a + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  /* pressing an option must not pull focus off the trigger before the
     click lands */
  const holdFocus = (e: PointerEvent) => e.preventDefault();

  let index = -1;

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`${fieldClassName} flex cursor-pointer items-baseline gap-[0.8em] text-left ${
          open ? "border-accent" : ""
        }`}
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            selected ? "text-[var(--fg)]" : "text-[var(--fg-28)]"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        {selected?.hint && (
          <span className="shrink-0 whitespace-nowrap text-[length:var(--fs-small)] text-[var(--fg-70)]">
            {selected.hint}
          </span>
        )}
        <span
          aria-hidden
          className={`shrink-0 text-[var(--fg-70)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          &#8595;
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            /* Lenis would otherwise take the wheel and scroll the page */
            data-lenis-prevent
            onPointerDown={holdFocus}
            className="absolute left-0 top-[calc(100%+8px)] z-30 max-h-[min(400px,55vh)] w-max min-w-full max-w-[min(460px,calc(100vw-2*var(--gutter)))] overflow-y-auto overscroll-contain border border-[var(--rule)] bg-[color-mix(in_oklab,var(--bg),var(--fg)_7%)] py-[0.4em] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [...EASE_OUT] }}
          >
            {groups.map((group, gi) => (
              <div
                key={group.label ?? `group-${gi}`}
                role="group"
                aria-labelledby={group.label ? `${id}-group-${gi}` : undefined}
                className={
                  gi > 0
                    ? "mt-[0.4em] border-t border-[var(--rule)] pt-[0.4em]"
                    : undefined
                }
              >
                {group.label && (
                  <div
                    id={`${id}-group-${gi}`}
                    className={`micro ${INSET} pb-[0.5em] pt-[0.9em] text-[var(--fg-70)]`}
                  >
                    {group.label}
                  </div>
                )}
                {group.options.map((option) => {
                  index += 1;
                  const i = index;
                  const isActive = i === active;
                  const isChosen = option.value === value;
                  return (
                    <div
                      key={option.value}
                      id={optionId(i)}
                      role="option"
                      aria-selected={isChosen}
                      onPointerMove={() => setActive(i)}
                      onClick={() => choose(i)}
                      className={`flex cursor-pointer items-baseline gap-[1.6em] ${INSET} py-[0.62em] text-[length:var(--fs-body)] transition-colors duration-150 ${
                        isActive
                          ? "bg-[color-mix(in_oklab,var(--fg)_8%,transparent)] text-[var(--fg)]"
                          : "text-[color-mix(in_oklab,var(--fg)_82%,transparent)]"
                      }`}
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-[0.75em] text-[length:var(--fs-body)] leading-[1.3]">
                        <span
                          aria-hidden
                          className={`block size-[0.38em] shrink-0 rounded-full transition-colors duration-200 ${
                            isChosen ? "bg-accent" : "bg-[var(--fg-14)]"
                          }`}
                        />
                        <span className="truncate">{option.label}</span>
                      </span>
                      {option.hint && (
                        <span className="shrink-0 whitespace-nowrap text-[length:var(--fs-small)] text-[var(--fg-70)]">
                          {option.hint}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
