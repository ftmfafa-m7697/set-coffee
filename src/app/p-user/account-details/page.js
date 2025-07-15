import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import AccountDetails from "@/components/templates/details/AccountDetails";

const page = () => {
  return (
    <UserPanelLayout>
      <AccountDetails />
    </UserPanelLayout>
  );
};

export default page;
