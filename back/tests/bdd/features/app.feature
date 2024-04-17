Feature: My app is working

  In order to see my app working
	As a user
	I should be able to call the app with 3 different commands
	$ fleet create <userId>
	$ fleet register-vehicle <fleetId> <vehiclePlateNumber>
	$ fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
	
	Scenario: I call the app with the create command
		Given I call the app with the command "fleet create 1"
		Then the app should display the fleetId "1"
		Then the app should have created a fleet with fleetId "1"

	Scenario: I call the app with the register-vehicle command
		Given my fleet
		And a vehicle
		And I have registered this vehicle into my fleet
		And I call the app with the command "fleet register-vehicle 1 ABC-1234"
		Then the app should have create a vehicle with vehicleId "1"

	Scenario: I call the app with the localize-vehicle command
		Given my fleet
		And a vehicle
		And I have registered this vehicle into my fleet
		And I call the app with the command "fleet localize-vehicle 1 ABC-1234 5.25 2.30 30"
		Then the app should have updated the vehicle with vehicle plate number "ABC-1234" location to "5.25 2.30 30"
