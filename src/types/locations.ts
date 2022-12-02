export interface Interval {
	start?: any,
	end?: any,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export enum CovidVaccinesOffered {
	PFIZER = "Pfizer",
	MODERNA = "Moderna",
	JOHNSON___JOHNSON = "Johnson & Johnson",
}

export interface FrequentlyAskedQuestions {
	question: string,
	answer?: string,
}

export enum Type {
	DEPARTMENT_IN = "Department In",
	INDEPENDENT_ESTABLISHMENT_IN = "Independent Establishment In",
}

export interface GoogleEntityRelationship {
	type: Type,
	placeId: string,
}

export enum PickupAndDeliveryServices {
	IN_STORE_PICKUP = "In-Store Pickup",
	CURBSIDE_PICKUP = "Curbside Pickup",
	PICKUP_NOT_OFFERED = "Pickup Not Offered",
	DELIVERY = "Delivery",
	SAME_DAY_DELIVERY = "Same Day Delivery",
	NO_CONTACT_DELIVERY = "No-Contact Delivery",
	DELIVERY_NOT_OFFERED = "Delivery Not Offered",
}

export enum Type_1 {
	POSTAL_CODE = "Postal Code",
	REGION = "State/Region",
	COUNTY = "County",
	CITY = "City",
	SUBLOCALITY = "Sublocality",
}

export interface ServiceAreaPlaces {
	name?: string,
	type?: Type_1,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export enum Type_2 {
	NONE = "None",
	BOOK_NOW = "Book Now",
	CALL_NOW = "Call Now",
	CONTACT_US = "Contact Us",
	SEND_MESSAGE = "Send Message",
	USE_APP = "Use App",
	PLAY_GAME = "Play Game",
	SHOP_NOW = "Shop Now",
	SIGN_UP = "Sign Up",
	WATCH_VIDEO = "Watch Video",
	SEND_EMAIL = "Send Email",
	LEARN_MORE = "Learn More",
	PURCHASE_GIFT_CARDS = "Purchase Gift Cards",
	ORDER_NOW = "Order Now",
	FOLLOW_PAGE = "Follow Page",
}

export interface FacebookCallToAction {
	type: Type_2,
	value?: string,
}

export interface FeaturedMessage {
	description?: string,
	url?: string,
}

export enum LocationType {
	LOCATION = "Location",
	HEALTHCARE_FACILITY = "Healthcare Facility",
	HEALTHCARE_PROFESSIONAL = "Healthcare Professional",
	ATM = "ATM",
	RESTAURANT = "Restaurant",
	HOTEL = "Hotel",
}

export interface MenuUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface OrderUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export enum PaymentOptions {
	ALIPAY = "AliPay",
	AMERICANEXPRESS = "American Express",
	ANDROIDPAY = "Google Pay",
	APPLEPAY = "Apple Pay",
	ATM = "ATM",
	ATMQUICK = "ATM Quick",
	BACS = "BACS",
	BANCONTACT = "Bancontact",
	BANKDEPOSIT = "Bank Deposit",
	BGO = "Bank/Giro Overschrijving",
	BITCOIN = "Bitcoin",
	Bar = "Bargeld",
	CARTASI = "CartaSi",
	CASH = "Cash",
	CCS = "CCS",
	CHECK = "Check",
	CONB = "Contactloos betalen",
	CVVV = "Cadeaubon/VVV bon",
	DEBITNOTE = "Debit Note",
	DINERSCLUB = "Diners Club",
	DIRECTDEBIT = "Direct Debit",
	DISCOVER = "Discover",
	ECKARTE = "Girokarte",
	ECOCHEQUE = "EcoCheque",
	EKENA = "E-kena",
	EMV = "Elektronische Maaltijdcheques",
	FINANCING = "Financing",
	GOPAY = "GoPay",
	HEBAG = "He-Bag",
	IBOD = "iBOD",
	ICCARDS = "IC Cards",
	ID = "iD",
	IDEAL = "iDeal",
	INCA = "Incasso",
	INVOICE = "Invoice",
	JCB = "JCB",
	JCoinPay = "J−Coin Pay",
	JKOPAY = "JKO Pay",
	KLA = "Klantenkaart",
	KLARNA = "Klarna",
	LINEPAY = "LINE Pay",
	MAESTRO = "Maestro",
	MASTERCARD = "MasterCard",
	MIPAY = "Mi Pay",
	MONIZZE = "Monizze",
	Manuelle_Lastsch = "Manuelle Lastschrift",
	Merpay = "メルPay",
	NANACO = "nanaco",
	NEXI = "Nexi",
	OREM = "Onder Rembours",
	PAYBACKPAY = "Payback Pay",
	PAYBOX = "Paybox",
	PAYCONIQ = "Payconiq",
	PAYPAL = "PayPal",
	PAYPAY = "PayPay",
	PAYSEC = "PaySec",
	POSTEPAY = "Postepay",
	QRCODE = "QR Code Payment",
	QUICPAY = "QUICPay",
	RAKUTENEDY = "Rakuten Edy",
	RakutenPay = "楽天Pay",
	SAMSUNGPAY = "Samsung Pay",
	SODEXO = "Sodexo",
	SWISH = "Swish",
	TEST = "Test",
	TEST_2 = "rajeev",
	TICKETRESTAURANT = "Ticket Restaurant",
	TRAVELERSCHECK = "Traveler's Check",
	TWINT = "Twint",
	UNIONPAY = "China UnionPay",
	VEV = "Via een verzekering",
	VISA = "Visa",
	VISAELECTRON = "Visa Electron",
	VOB = "Vooruit betalen",
	VOUCHER = "Voucher",
	VPAY = "V PAY",
	WAON = "WAON",
	WECHATPAY = "WeChat Pay",
	WIRETRANSFER = "Wire Transfer",
	YuchoPay = "ゆうちょPay",
	AuPay = "auPay",
	DBarai = "d払い",
	Überweisung = "Banküberweisung",
}

export enum PriceRange {
	UNSPECIFIED = "Unspecified",
	ONE = "$",
	TWO = "$$",
	THREE = "$$$",
	FOUR = "$$$$",
}

export interface RankTrackingCompetitors {
	name: string,
	website: string,
}

export enum RankTrackingFrequency {
	WEEKLY = "Weekly",
	MONTHLY = "Monthly",
	QUARTERLY = "Quarterly",
}

export enum RankTrackingKeywords {
	NAME = "Name",
	PRIMARY_CATEGORY = "Primary Category",
	SECONDARY_CATEGORY = "Secondary Category",
}

export enum RankTrackingQueryTemplates {
	KEYWORD = "Keyword",
	KEYWORD_ZIP = "Keyword Zip",
	KEYWORD_CITY = "Keyword City",
	KEYWORD_IN_CITY = "Keyword in City",
	KEYWORD_NEAR_ME = "Keyword near me",
	KEYWORD_CITY_STATE = "Keyword City State",
}

export enum RankTrackingSites {
	GOOGLE_DESKTOP = "Google Desktop",
	GOOGLE_MOBILE = "Google Mobile",
	BING_DESKTOP = "Bing Desktop",
	BING_MOBILE = "Bing Mobile",
	YAHOO_DESKTOP = "Yahoo Desktop",
	YAHOO_MOBILE = "Yahoo Mobile",
}

export interface ReservationUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ServiceArea {
	places?: string[],
}

export enum Presentation {
	BUTTON = "Button",
	LINK = "Link",
}

export interface UberLink {
	text?: string,
	presentation: Presentation,
}

export interface UberTripBranding {
	text: string,
	url: string,
	description: string,
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ComplexVideo {
	url: string,
	video?: string,
	description?: string,
}

export default interface Location {
	accessHours?: Hours,
	bingWebsiteOverride?: string,
	blackOwnedBusiness?: boolean,
	brunchHours?: Hours,
	questionsAndAnswers?: boolean,
	covid19InformationUrl?: string,
	covidMessaging?: string,
	covidTestAppointmentUrl?: string,
	covidTestingAppointmentRequired?: boolean,
	covidTestingDriveThroughSite?: boolean,
	covidTestingIsFree?: boolean,
	covidTestingPatientRestrictions?: boolean,
	covidTestingReferralRequired?: boolean,
	covidTestingSiteInstructions?: string,
	covidVaccineAppointmentRequired?: boolean,
	covidVaccineDriveThroughSite?: boolean,
	covidVaccineInformationUrl?: string,
	covidVaccinePatientRestrictions?: boolean,
	covidVaccineReferralRequired?: boolean,
	covidVaccineSiteInstructions?: string,
	covidVaccinesOffered?: CovidVaccinesOffered[],
	deliveryHours?: Hours,
	dineInHours?: Hours,
	driveThroughHours?: Hours,
	facebookAbout?: string,
	facebookWebsiteOverride?: string,
	frequentlyAskedQuestions?: FrequentlyAskedQuestions[],
	fullyVaccinatedStaff?: boolean,
	geomodifier?: string,
	googleEntityRelationship?: GoogleEntityRelationship,
	googleMyBusinessLabels?: string[],
	googlePlaceId?: string,
	googleShortName?: string,
	happyHours?: Hours,
	holidayHoursConversationEnabled?: boolean,
	impressum?: string,
	kitchenHours?: Hours,
	landingPageUrl?: string,
	linkedInUrl?: string,
	neighborhood?: string,
	nudgeEnabled?: boolean,
	onlineServiceHours?: Hours,
	phoneticName?: string,
	pickupAndDeliveryServices?: PickupAndDeliveryServices[],
	pickupHours?: Hours,
	primaryConversationContact?: any,
	proofOfVaccinationRequired?: boolean,
	reviewResponseConversationEnabled?: boolean,
	seniorHours?: Hours,
	serviceAreaPlaces?: ServiceAreaPlaces[],
	slug?: string,
	takeoutHours?: Hours,
	what3WordsAddress?: string,
	yelpLinkedAccount?: any,
	yelpWebsiteOverride?: string,
	additionalHoursText?: string,
	address: Address,
	addressHidden?: boolean,
	alternatePhone?: any,
	androidAppUrl?: string,
	associations?: string[],
	brands?: string[],
	description?: string,
	hours?: Hours,
	logo?: ComplexImage,
	name: string,
	categories?: any,
	cityCoordinate?: Coordinate,
	closed?: boolean,
	c_featuredFAQs?: EntityReference[],
	c_featuredMenuItems?: EntityReference[],
	firstPartyReviewPage?: any,
	reviewGenerationUrl?: any,
	defaultReviewInviteTemplate?: any,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	emails?: string[],
	facebookOverrideCity?: string,
	facebookCoverPhoto?: Image,
	facebookCallToAction?: FacebookCallToAction,
	facebookDescriptor?: string,
	facebookEmail?: string,
	facebookLinkedAccount?: any,
	facebookName?: string,
	facebookPageUrl?: string,
	facebookParentPageId?: string,
	facebookProfilePhoto?: Image,
	facebookStoreId?: string,
	facebookVanityUrl?: string,
	fax?: any,
	featuredMessage?: FeaturedMessage,
	foursquareLinkedAccount?: any,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	gmbLinkedAccount?: any,
	googleAccountId?: string,
	googleAttributes?: any,
	googleCoverPhoto?: Image,
	googleProfilePhoto?: Image,
	googleWebsiteOverride?: string,
	instagramHandle?: string,
	iosAppUrl?: string,
	isoRegionCode?: string,
	keywords?: string[],
	languages?: string[],
	localPhone?: any,
	locationType?: LocationType,
	mainPhone?: any,
	menuUrl?: MenuUrl,
	mobilePhone?: any,
	orderUrl?: OrderUrl,
	paymentOptions?: PaymentOptions[],
	phones?: any,
	pickupCoordinate?: Coordinate,
	priceRange?: PriceRange,
	products?: string[],
	alternateNames?: string[],
	alternateWebsites?: string[],
	rankTrackingCompetitors?: RankTrackingCompetitors[],
	customKeywords?: string[],
	rankTrackingEnabled?: boolean,
	rankTrackingFrequency?: RankTrackingFrequency,
	rankTrackingKeywords?: RankTrackingKeywords[],
	rankTrackingQueryTemplates?: RankTrackingQueryTemplates[],
	rankTrackingSites?: RankTrackingSites[],
	reservationUrl?: ReservationUrl,
	routableCoordinate?: Coordinate,
	serviceArea?: ServiceArea,
	services?: string[],
	shortName35?: string,
	shortName64?: string,
	specialities?: string[],
	id: string,
	timezone?: any,
	tollFreePhone?: any,
	ttyPhone?: any,
	twitterHandle?: string,
	uberClientId?: string,
	uberLink?: UberLink,
	uberTripBranding?: UberTripBranding,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yearEstablished?: number,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
	videos?: ComplexVideo[],
}
