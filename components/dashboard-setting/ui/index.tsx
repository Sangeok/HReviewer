"use client";

import ProfileForm from "@/module/settings/actions/components/profile-form";
import RepositoryList from "@/module/settings/actions/components/repository-list";

export default function DashboardSetting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your settings</p>
      </div>
      <ProfileForm />
      <RepositoryList />
    </div>
  );
}
