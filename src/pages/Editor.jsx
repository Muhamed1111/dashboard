import { list } from 'postcss';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Header } from '../components';

const Editor = () => {
  const [content, setContent] = useState('');
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'video'],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];
  return (
    <div className="dark:bg-secondary-dark-bg  m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Editor" category="App" />
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        theme='snow'
        className='bg-white'
        placeholder='Start typing...'
      />
    </div>
  )
}

export default Editor