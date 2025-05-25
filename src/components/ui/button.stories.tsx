import type {Meta, StoryObj} from '@storybook/react';
import {Button} from './button';
import {CircleX, Trash2, SquarePen} from 'lucide-react';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
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
        children: {
            control: "text",
        },
    },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Default',
    },
}

export const Primary: Story = {
    args: {
        variant: 'default',
        children: 'Button',
    },
}

export const Cancel: Story = {
    args: {
        variant: 'outline',
        children: (
            <>
                <CircleX className="mr-2 h-4 w-4"/> Cancel
            </>
        ),
    },
}

export const Trash: Story = {
    args: {
        variant: 'default',
        children: (
            <>
                <Trash2 className="mr-2 h-4 w-4"/> Delete
            </>
        ),
    },
}

export const WithCustomClass: Story = {
    args: {
        variant: 'default',
        children: (
            <>
                <Trash2 className="mr-2 h-4 w-4"/> Delete
            </>
        ),
        className: '...',
    },
}

export const WithIcon = () => (
    <Button>
        <SquarePen className="mr-2" />
        Edit
    </Button>
);

export const Disabled = () => <Button disabled>Disabled</Button>;