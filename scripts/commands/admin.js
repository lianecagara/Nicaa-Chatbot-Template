const fs = require("fs");

module.exports = {
  config: {
    name: "admin",
    description: "Displays a list of admins or manages admins.",
    usage: ":admin [add/remove/list] [userID]",
    author: "Rui | Bug Fixed by Jenica",
    adminOnly: true,
  },

  onCommand: ({ args, box }) => {
    const [action, userID] = args;

    const admins = loadAdmins();

    switch (action) {
      case "add":
        addAdmin(userID, admins, box);
        break;
      case "remove":
        removeAdmin(userID, admins, box);
        break;
      case "list":
        listAdmins(admins, box);
        break;
      default:
        box.reply("Invalid usage. Please use `:admin [add/remove/list] [userID]`");
    }
  },
};

function loadAdmins() {
  try {
    const adminData = fs.readFileSync("admin.json", "utf8");
    return JSON.parse(adminData).admins || [];
  } catch (error) {
    console.error("Error loading admin list:", error);
    return [];
  }
}

function saveAdmins(admins) {
  fs.writeFileSync("admin.json", JSON.stringify({ admins }, null, 2));
}

function addAdmin(userID, admins, box) {
  if (!admins.some((admin) => admin.id === userID)) {
    admins.push({ id: userID, name: `Admin${admins.length + 1}` });
    saveAdmins(admins);
    box.reply(`Admin with ID ${userID} has been added.`);
  } else {
    box.reply(`User with ID ${userID} is already an admin.`);
  }
}

function removeAdmin(userID, admins, box) {
  const index = admins.findIndex((admin) => admin.id === userID);
  if (index !== -1) {
    const removedAdmin = admins.splice(index, 1)[0];
    saveAdmins(admins);
    box.reply(`Admin with ID ${removedAdmin.id} has been removed.`);
  } else {
    box.reply(`User with ID ${userID} is not an admin.`);
  }
}

function listAdmins(admins, box) {
  if (admins.length > 0) {
    const adminList = admins.map((admin) => `${admin.name} (ID: ${admin.id})`).join("\n");
    box.reply(adminList ? `List of admins:\n${adminList}` : "No admins found.");
  } else {
    box.reply("No admins found.");
  }
}
