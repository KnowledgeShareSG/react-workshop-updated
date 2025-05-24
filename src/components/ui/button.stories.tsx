import type {Meta, StoryObj} from '@storybook/react';
import {Button} from './button';
import {CircleX, Trash2} from 'lucide-react';

const meta: Meta<typeof Button> = {
    title: 'Component/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {type: "select"},
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
        size: {
            control: {type: "select"},
            options: ['default', 'sm', 'lg', 'icon'],
        },
        icon: {
            control: false,
        },
        children: {
            control: "text",
        },
    },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: 'default',
        children: 'Button',
    },
}

export const Cancel: Story = {
    args: {
        variant: 'outline',
        children: 'Cancel',
        icon: <CircleX className="h-4 w-4"/>,
    },
}

export const Trash: Story = {
    args: {
        variant: 'default',
        children: 'Delete',
        icon: <Trash2 className="h-4 w-4"/>,
    },
}