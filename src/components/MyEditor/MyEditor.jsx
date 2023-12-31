import React, {useEffect, useRef, useState} from 'react';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './index.css'
import InlineStyleControls from "./Components/InlineStyleControls";
import BlockStyleControls from "./Components/BlockStyleControls";

export const MyEditor = (props) => {
    const {value, onChange, readOnly} = props
    const editor = useRef(null)
    const focus = () => editor.current.focus();

    let forOldEvent=EditorState.createEmpty()
    try {
        forOldEvent = value ?
            EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
            : EditorState.createEmpty()
    }catch (e){}

    const [editorState, setEditorState] = useState(forOldEvent)

    useEffect(() => {
        try {
            if (value && !editorState.getCurrentContent().hasText()) {
                setEditorState(value ?
                    EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
                    : EditorState.createEmpty())
            }
        }catch (e){}
    }, [value])

    useEffect(() => {
        if (onChange) {
            if (editorState.getCurrentContent().hasText())
                onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            else
                onChange('')
        }
    }, [editorState])


    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }

    const styleMap = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
    };

    const onTab = (e) => {
        const maxDepth = 4;
        setEditorState(RichUtils.onTab(e, editorState, maxDepth));
    }

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    const toggleInlineStyle = (inlineStyle) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            default:
                return null;
        }
    }

    let className = `RichEditor-editor ${readOnly ? 'RichEditor-editor-read' : ''}`

    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className={`RichEditor-root${readOnly ? '-read' : ''}`}>
            {!readOnly &&
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
            }
            {!readOnly &&
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
            }
            <div className={className} onClick={focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    onTab={onTab}
                    placeholder="Введите информацию"
                    ref={editor}
                    spellCheck={true}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
}

