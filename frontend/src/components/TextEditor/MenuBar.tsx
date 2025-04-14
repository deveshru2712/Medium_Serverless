import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Editor } from "@tiptap/react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
      tooltip: "Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () =>
        editor.chain().focus().toggleHighlight({ color: "#FFFF00" }).run(),
      pressed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 flex flex-wrap gap-1">
      {Options.map((item, index) => (
        <Toggle
          key={index}
          icon={item.icon}
          onToggle={item.onClick}
          pressed={item.pressed}
          tooltip={item.tooltip}
        />
      ))}
    </div>
  );
};

export default MenuBar;

interface ToggleProps {
  icon: React.ReactNode;
  pressed: boolean;
  onToggle: () => void;
  tooltip?: string;
}

const Toggle = ({ icon, pressed, onToggle, tooltip }: ToggleProps) => {
  return (
    <button
      className={`cursor-pointer p-2 ${
        pressed ? "bg-black/10 text-blue-600" : ""
      } rounded-sm hover:bg-black/5 transition-colors`}
      onClick={onToggle}
      aria-pressed={pressed}
      title={tooltip}
    >
      {icon}
    </button>
  );
};
