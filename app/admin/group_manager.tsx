"use client";

import { useState, useTransition } from "react";
import { addGroupMember, removeGroupMember, createGroup } from "./actions";

type GroupWithMembers = {
  id: string;
  name: string;
  description: string | null;
  members: { user_id: string; email: string }[];
};

type Props = {
  groups: GroupWithMembers[];
};

export default function GroupManager({ groups }: Props) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  // add member form state
  const [addEmail, setAddEmail] = useState("");
  const [addGroup, setAddGroup] = useState(groups[0]?.name ?? "");

  // create group form state
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  function handleAddMember(e: React.FormEvent) {
    e.preventDefault();
    if (!addEmail.trim() || !addGroup) return;
    setMessage(null);
    startTransition(async () => {
      const res = await addGroupMember(addEmail.trim(), addGroup);
      if (res?.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: `added ${addEmail} to ${addGroup}`, type: "success" });
        setAddEmail("");
      }
    });
  }

  function handleRemove(userId: string, groupName: string, email: string) {
    setMessage(null);
    startTransition(async () => {
      const res = await removeGroupMember(userId, groupName);
      if (res?.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: `removed ${email} from ${groupName}`, type: "success" });
      }
    });
  }

  function handleCreateGroup(e: React.FormEvent) {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setMessage(null);
    startTransition(async () => {
      const res = await createGroup(newGroupName.trim(), newGroupDesc.trim());
      if (res?.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: `created group: ${newGroupName.trim().toLowerCase()}`, type: "success" });
        setNewGroupName("");
        setNewGroupDesc("");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* message */}
      {message && (
        <div
          className={`text-sm px-3 py-2 rounded ${
            message.type === "error"
              ? "bg-red-900/50 text-red-300 border border-red-800"
              : "bg-green-900/50 text-green-300 border border-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* existing groups */}
      {groups.map((group) => (
        <div key={group.id} className="border border-gray-800 rounded-lg p-4">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-semibold text-yellow-400">{group.name}</h3>
            {group.description && (
              <span className="text-xs text-gray-500">{group.description}</span>
            )}
          </div>
          {group.members.length === 0 ? (
            <p className="text-gray-600 text-xs italic mt-2">no members</p>
          ) : (
            <div className="mt-2 space-y-1">
              {group.members.map((member) => (
                <div
                  key={member.user_id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="text-gray-300 flex-1 truncate">
                    {member.email}
                  </span>
                  <button
                    onClick={() =>
                      handleRemove(member.user_id, group.name, member.email)
                    }
                    disabled={isPending}
                    className="text-xs text-red-800 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* add member form */}
      <form
        onSubmit={handleAddMember}
        className="border border-gray-800 rounded-lg p-4"
      >
        <h3 className="font-semibold text-sm mb-3">add member to group</h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="email"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
            placeholder="user email"
            required
            className="flex-1 min-w-[200px] bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-600"
          />
          <select
            value={addGroup}
            onChange={(e) => setAddGroup(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-600"
          >
            {groups.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isPending}
            className="text-sm bg-yellow-900 hover:bg-yellow-800 border border-yellow-700 text-yellow-200 rounded px-4 py-1.5 transition-colors disabled:opacity-50"
          >
            {isPending ? "adding..." : "add"}
          </button>
        </div>
      </form>

      {/* create group form */}
      <form
        onSubmit={handleCreateGroup}
        className="border border-gray-800 rounded-lg p-4"
      >
        <h3 className="font-semibold text-sm mb-3">create new group</h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="group name"
            required
            className="min-w-[140px] bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-600"
          />
          <input
            type="text"
            value={newGroupDesc}
            onChange={(e) => setNewGroupDesc(e.target.value)}
            placeholder="description (optional)"
            className="flex-1 min-w-[200px] bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-600"
          />
          <button
            type="submit"
            disabled={isPending}
            className="text-sm bg-yellow-900 hover:bg-yellow-800 border border-yellow-700 text-yellow-200 rounded px-4 py-1.5 transition-colors disabled:opacity-50"
          >
            {isPending ? "creating..." : "create"}
          </button>
        </div>
      </form>
    </div>
  );
}
