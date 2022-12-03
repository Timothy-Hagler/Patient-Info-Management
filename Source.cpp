#include <iostream>

int main()
{
	//Start the React App through Command Line
	//Install any dependencies that the system does not have
	system("cd ./patient_information_management && npm install");
	//Start the server.js file
	system("cd ./patient_information_management && start /b node server.js");
	//Start the actual React-app
	system("cd ./patient_information_management && start npm start");

	return 0; //Indicates the program exited correctly
}