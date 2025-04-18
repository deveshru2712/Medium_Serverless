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
  Image as ImageIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = async (event) => {
          try {
            const fileUrl = event.target?.result as string;

            // Upload to Cloudinary
            const cloudName = import.meta.env.VITE_CLOUD_NAME;
            const formData = new FormData();
            formData.append("file", fileUrl);
            formData.append("upload_preset", "medium");

            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
            );

            const imageUrl = response.data.secure_url;

            // Set image in editor
            editor.chain().focus().setImage({ src: imageUrl }).run();
          } catch (error) {
            toast.error("Unable to upload the image");
            console.error("Error uploading image:", error);
          }
        };

        reader.onerror = (error) => {
          toast.error("Unable to read the file");
          console.error("Error reading file:", error);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Unable to process the image");
        console.error("Error processing image:", error);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
      tooltip: "Heading 3",
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
      tooltip: "Strikethrough",
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
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () =>
        editor.chain().focus().toggleHighlight({ color: "#FFFF00" }).run(),
      pressed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
    {
      icon: <ImageIcon className="size-4" />,
      onClick: addImage,
      pressed: false,
      tooltip: "Insert Image",
    },
  ];

  return (
    <>
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
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
