import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export function MyCommandCell({ edit, remove, add, update, discard, cancel, editField }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            return (
                <td className="k-command-cell">
                    <button
                        className="k-primary k-button k-grid-edit-command"
                        onClick={() => edit(dataItem)}
                    >
                        Edit
                    </button>
                    <button
                        className="k-primary k-button k-grid-edit-command"
                        onClick={() => edit(dataItem)}
                    >
                        Update
                    </button>
                    <button
                        className="k-button k-grid-remove-command"
                        onClick={() =>remove(dataItem)}
                    >
                        Remove
                    </button>
                </td>
            );
        }
    }
};