import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface SimpleTextEditorProps {
  defaultValue?: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  Fixedheight?: string | number;
  maxWords?: number;
}

const SimpleTextEditor: React.FC<SimpleTextEditorProps> = ({
  defaultValue,
  value,
  onChange,
  placeholder,
  Fixedheight,
  maxWords,
}) => {
  const [content, setContent] = useState<string>(value);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleChange = (content: string, delta: any, source: string, editor: any) => {
    const text = editor.getText();
    const words = text.trim().split(/\s+/);
    if (maxWords && words.length > maxWords) {
      const trimmedContent = words.slice(0, maxWords).join(' ');
      editor.setText(trimmedContent);
      setContent(trimmedContent);
      onChange(trimmedContent);
    } else {
      onChange(content);
    }
  };

  return (
    <div style={{ width: '100%', height: Fixedheight }}>
      <ReactQuill
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default SimpleTextEditor;
