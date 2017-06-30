<?php
class Home extends Controller
{
	public function index()
	{		
		// initializing view for the form		
		$this->view('home/index');	
	}

	public function saveTransferRequest($formdata = []){
	// if the post request is received, collect the data and put it into an xml file 		
		if(isset($_POST)){
			$xml = new DOMDocument('1.0', 'utf-8');
			$xml->formatOutput = true;
			$xml->preserveWhiteSpace = false;
			$xml->load('xml/transferRequests.xml');			

			$newItem = $xml->createElement('singleTransferRequest');
			$newItem->appendChild($xml->createElement('timestamp', date("F j, Y, g:i a",time())));;
			$newItem->appendChild($xml->createElement('fname', $_POST['name']));
			$newItem->appendChild($xml->createElement('currency_from', $_POST['currency_from']));
			$newItem->appendChild($xml->createElement('currency_to', $_POST['currency_to']));
			$newItem->appendChild($xml->createElement('rate', $_POST['rate']));
			$newItem->appendChild($xml->createElement('amt', $_POST['amt']));
			$newItem->appendChild($xml->createElement('receivable', $_POST['receivable']));			

			$xml->getElementsByTagName('transferRequests')->item(0)->appendChild($newItem);

			$xml->save('xml/transferRequests.xml');


			echo json_encode("Data has been written");
		}						
	}

	public function viewTransferRequest(){
		// this functions collect all the data written in xml file and return it
		$xml=simplexml_load_file("xml/transferRequests.xml");
		echo json_encode($xml);
	
	}
}

?>