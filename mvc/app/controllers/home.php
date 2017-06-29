<?php
class Home extends Controller
{
	public function index($name)
	{

		$user = $this->model('User');
		
		$user->showname($name);	

		$this->view('home/index',$name);	

	}

	public function transferRequest($formdata = []){
		if(isset($_POST)){
			
			$fname = $_POST['name'];
			$country_from = $_POST['country_from'];
			$country_to = $_POST['country_to'];
			$rate = $_POST['rate'];
			$amount = $_POST['amt'];
			$receivable = $_POST['receivable'];

 
			// $xml = new DOMDocument();
			// $xml->load('xml/transferRequests.xml');
			// $nodes = $xml->getElementsByTagName('transferRequests') ;			
			// if ($nodes->length > 0) {
			// 	$xml_singleTransferRequest = $xml->createElement("singleTransferRequest");
			// 	$xml->appendChild( $xml_singleTransferRequest );				
			//    //insert some stuff using appendChild()
			// }

			// //re-save
			// $xml->save("xml/transferRequests.xml");


			$xml = new DOMDocument('1.0', 'utf-8');
			$xml->formatOutput = true;
			$xml->preserveWhiteSpace = false;
			$xml->load('xml/transferRequests.xml');			
			$newItem = $xml->createElement('singleTransferRequest');
			$newItem->appendChild($xml->createElement('timestamp', date("F j, Y, g:i a",time())));;
			$newItem->appendChild($xml->createElement('fname', $_POST['name']));
			$newItem->appendChild($xml->createElement('country_from', $_POST['country_from']));
			$newItem->appendChild($xml->createElement('country_to', $_POST['country_to']));
			$newItem->appendChild($xml->createElement('rate', $_POST['rate']));
			$newItem->appendChild($xml->createElement('amt', $_POST['amt']));
			$newItem->appendChild($xml->createElement('receivable', $_POST['receivable']));
			


			$xml->getElementsByTagName('transferRequests')->item(0)->appendChild($newItem);

			$xml->save('xml/transferRequests.xml');

			echo "Data has been written.";
		}
		
		
		
	}
}

?>